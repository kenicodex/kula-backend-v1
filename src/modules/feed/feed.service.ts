import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Comment, Post, PostType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly authorSelect = {
    id: true,
    name: true,
    avatar: true,
    role: true,
  } as const;

  private readonly commentAuthorSelect = {
    id: true,
    name: true,
    avatar: true,
  } as const;

  async createPost(authorId: string, dto: CreatePostDto): Promise<Post> {
    // TODO(prisma): MenuItem model doesn't exist — dto.linkedMenuItem is ignored.
    const { mediaUrls, hashtags, type, linkedMenuItem: _linkedMenuItem, dailySpecialExpiresAt, ...rest } = dto;

    // Upsert hashtags first to obtain their ids.
    const hashtagIds: string[] = [];
    if (hashtags && hashtags.length) {
      const normalized = Array.from(
        new Set(hashtags.map((h) => h.toLowerCase().replace(/^#/, ''))),
      );
      for (const name of normalized) {
        const ht = await this.prisma.hashtag.upsert({
          where: { name },
          create: { name, useCount: 1 },
          update: { useCount: { increment: 1 } },
        });
        hashtagIds.push(ht.id);
      }
    }

    return this.prisma.post.create({
      data: {
        ...rest,
        type: type as PostType,
        authorId,
        dailySpecialExpiresAt: dailySpecialExpiresAt ? new Date(dailySpecialExpiresAt) : undefined,
        media: mediaUrls
          ? { create: mediaUrls.map((url, i) => ({ url, sortOrder: i })) }
          : undefined,
        hashtags: hashtagIds.length
          ? { create: hashtagIds.map((hashtagId) => ({ hashtagId })) }
          : undefined,
      },
      include: {
        author: { select: this.authorSelect },
        media: true,
        hashtags: { include: { hashtag: true } },
      },
    });
  }

  async getFeed(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: { select: this.authorSelect },
          media: true,
          hashtags: { include: { hashtag: true } },
        },
      }),
      this.prisma.post.count({ where: { isActive: true } }),
    ]);
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async getPost(postId: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { select: this.authorSelect },
        media: true,
        hashtags: { include: { hashtag: true } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async getChefPosts(authorId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.post.findMany({
      where: { authorId, isActive: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: { select: this.authorSelect },
        media: true,
        hashtags: { include: { hashtag: true } },
      },
    });
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) throw new ForbiddenException();
    await this.prisma.post.update({ where: { id: postId }, data: { isActive: false } });
  }

  async likePost(postId: string): Promise<{ likeCount: number }> {
    try {
      const post = await this.prisma.post.update({
        where: { id: postId },
        data: { likeCount: { increment: 1 } },
      });
      return { likeCount: post.likeCount };
    } catch {
      throw new NotFoundException('Post not found');
    }
  }

  async unlikePost(postId: string): Promise<{ likeCount: number }> {
    try {
      const post = await this.prisma.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
      });
      return { likeCount: post.likeCount };
    } catch {
      throw new NotFoundException('Post not found');
    }
  }

  async addComment(postId: string, authorId: string, text: string): Promise<Comment> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    const [comment] = await this.prisma.$transaction([
      this.prisma.comment.create({
        data: { postId, authorId, text },
      }),
      this.prisma.post.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 } },
      }),
    ]);
    return comment;
  }

  async getComments(postId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.comment.findMany({
      where: { postId, isFlagged: false },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
      include: { author: { select: this.commentAuthorSelect } },
    });
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== userId) throw new ForbiddenException();
    await this.prisma.$transaction([
      this.prisma.comment.delete({ where: { id: commentId } }),
      this.prisma.post.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: 1 } },
      }),
    ]);
  }

  async getByHashtag(hashtag: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const normalized = hashtag.toLowerCase().replace(/^#/, '');
    return this.prisma.post.findMany({
      where: {
        isActive: true,
        hashtags: { some: { hashtag: { name: normalized } } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        author: { select: this.authorSelect },
        media: true,
        hashtags: { include: { hashtag: true } },
      },
    });
  }

  async getTrendingPosts(limit = 20) {
    return this.prisma.post.findMany({
      where: { isActive: true },
      orderBy: [{ likeCount: 'desc' }, { commentCount: 'desc' }],
      take: limit,
      include: {
        author: { select: this.authorSelect },
        media: true,
        hashtags: { include: { hashtag: true } },
      },
    });
  }
}
