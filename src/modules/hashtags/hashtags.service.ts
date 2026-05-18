import { Injectable, NotFoundException } from '@nestjs/common';
import { Hashtag, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HashtagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreate(name: string): Promise<Hashtag> {
    const normalized = name.toLowerCase().replace(/^#/, '');
    return this.prisma.hashtag.upsert({
      where: { name: normalized },
      create: { name: normalized },
      update: {},
    });
  }

  async incrementUseCount(names: string[]): Promise<void> {
    const normalized = names.map((n) => n.toLowerCase().replace(/^#/, ''));
    await Promise.all(
      normalized.map((name) =>
        this.prisma.hashtag.upsert({
          where: { name },
          create: { name, useCount: 1 },
          update: { useCount: { increment: 1 } },
        }),
      ),
    );
  }

  async trending(limit = 20): Promise<Hashtag[]> {
    return this.prisma.hashtag.findMany({
      where: { isActive: true, isBanned: false },
      orderBy: { useCount: 'desc' },
      take: limit,
    });
  }

  async search(query: string): Promise<Hashtag[]> {
    const normalized = query.toLowerCase().replace(/^#/, '');
    return this.prisma.hashtag.findMany({
      where: {
        name: { contains: normalized, mode: Prisma.QueryMode.insensitive },
        isActive: true,
        isBanned: false,
      },
      orderBy: { useCount: 'desc' },
      take: 20,
    });
  }

  async findAll(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.hashtag.findMany({
        orderBy: { useCount: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.hashtag.count(),
    ]);
    return { data, total, page, limit };
  }

  async banHashtag(id: string): Promise<Hashtag> {
    try {
      return await this.prisma.hashtag.update({
        where: { id },
        data: { isBanned: true, isActive: false },
      });
    } catch {
      throw new NotFoundException('Hashtag not found');
    }
  }

  async featureHashtag(id: string, featured: boolean): Promise<Hashtag> {
    try {
      return await this.prisma.hashtag.update({
        where: { id },
        data: { isFeatured: featured },
      });
    } catch {
      throw new NotFoundException('Hashtag not found');
    }
  }
}
