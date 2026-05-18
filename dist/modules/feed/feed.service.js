"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FeedService = class FeedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    authorSelect = {
        id: true,
        name: true,
        avatar: true,
        role: true,
    };
    commentAuthorSelect = {
        id: true,
        name: true,
        avatar: true,
    };
    async createPost(authorId, dto) {
        const { mediaUrls, hashtags, type, linkedMenuItem: _linkedMenuItem, dailySpecialExpiresAt, ...rest } = dto;
        const hashtagIds = [];
        if (hashtags && hashtags.length) {
            const normalized = Array.from(new Set(hashtags.map((h) => h.toLowerCase().replace(/^#/, ''))));
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
                type: type,
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
    async getPost(postId) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: { select: this.authorSelect },
                media: true,
                hashtags: { include: { hashtag: true } },
            },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async getChefPosts(authorId, page = 1, limit = 20) {
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
    async deletePost(postId, userId) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        if (post.authorId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.post.update({ where: { id: postId }, data: { isActive: false } });
    }
    async likePost(postId) {
        try {
            const post = await this.prisma.post.update({
                where: { id: postId },
                data: { likeCount: { increment: 1 } },
            });
            return { likeCount: post.likeCount };
        }
        catch {
            throw new common_1.NotFoundException('Post not found');
        }
    }
    async unlikePost(postId) {
        try {
            const post = await this.prisma.post.update({
                where: { id: postId },
                data: { likeCount: { decrement: 1 } },
            });
            return { likeCount: post.likeCount };
        }
        catch {
            throw new common_1.NotFoundException('Post not found');
        }
    }
    async addComment(postId, authorId, text) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
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
    async getComments(postId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return this.prisma.comment.findMany({
            where: { postId, isFlagged: false },
            orderBy: { createdAt: 'asc' },
            skip,
            take: limit,
            include: { author: { select: this.commentAuthorSelect } },
        });
    }
    async deleteComment(commentId, userId) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.authorId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.$transaction([
            this.prisma.comment.delete({ where: { id: commentId } }),
            this.prisma.post.update({
                where: { id: comment.postId },
                data: { commentCount: { decrement: 1 } },
            }),
        ]);
    }
    async getByHashtag(hashtag, page = 1, limit = 20) {
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
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedService);
//# sourceMappingURL=feed.service.js.map