import { Injectable, NotFoundException } from '@nestjs/common';
import { Chef, ChefStatus, Hashtag, Review, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userPublicSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    role: true,
    avatar: true,
    isVerified: true,
    isActive: true,
    fcmToken: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  async getPendingChefs() {
    return this.prisma.chef.findMany({
      where: { status: ChefStatus.pending },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true, phone: true } },
      },
    });
  }

  async approveChef(chefId: string): Promise<Chef> {
    try {
      return await this.prisma.chef.update({
        where: { id: chefId },
        data: { status: ChefStatus.approved },
      });
    } catch {
      throw new NotFoundException('Chef not found');
    }
  }

  async rejectChef(chefId: string): Promise<Chef> {
    try {
      return await this.prisma.chef.update({
        where: { id: chefId },
        data: { status: ChefStatus.rejected },
      });
    } catch {
      throw new NotFoundException('Chef not found');
    }
  }

  async suspendChef(chefId: string): Promise<Chef> {
    try {
      return await this.prisma.chef.update({
        where: { id: chefId },
        data: { status: ChefStatus.suspended },
      });
    } catch {
      throw new NotFoundException('Chef not found');
    }
  }

  async getUsers(role?: string, page = 1, limit = 30) {
    const skip = (page - 1) * limit;
    const where = role ? { role: role as User['role'] } : {};
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: this.userPublicSelect,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async suspendUser(userId: string) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
        select: this.userPublicSelect,
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async reinstateUser(userId: string) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: true },
        select: this.userPublicSelect,
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async unflagReview(reviewId: string): Promise<Review> {
    try {
      return await this.prisma.review.update({
        where: { id: reviewId },
        data: { isFlagged: false },
      });
    } catch {
      throw new NotFoundException('Review not found');
    }
  }

  async deleteReview(reviewId: string): Promise<void> {
    await this.prisma.review.delete({ where: { id: reviewId } }).catch(() => undefined);
  }

  async getFlaggedReviews() {
    return this.prisma.review.findMany({
      where: { isFlagged: true },
      include: {
        client: { select: { id: true, name: true } },
        chef: true,
      },
    });
  }

  async getAnalytics() {
    const [totalUsers, totalChefs, totalBookings, completedBookings, pendingChefApplications, revenue] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.chef.count({ where: { status: ChefStatus.approved } }),
        this.prisma.booking.count(),
        this.prisma.booking.count({ where: { status: 'completed' } }),
        this.prisma.chef.count({ where: { status: ChefStatus.pending } }),
        this.prisma.booking.aggregate({
          where: { status: 'completed' },
          _sum: { totalAmount: true, platformFee: true },
        }),
      ]);

    return {
      totalUsers,
      totalChefs,
      totalBookings,
      completedBookings,
      pendingChefApplications,
      totalGMV: revenue._sum.totalAmount ?? 0,
      totalPlatformFees: revenue._sum.platformFee ?? 0,
    };
  }

  async banHashtag(hashtagId: string): Promise<Hashtag> {
    try {
      return await this.prisma.hashtag.update({
        where: { id: hashtagId },
        data: { isBanned: true, isActive: false },
      });
    } catch {
      throw new NotFoundException('Hashtag not found');
    }
  }

  async featureHashtag(hashtagId: string, featured: boolean): Promise<Hashtag> {
    try {
      return await this.prisma.hashtag.update({
        where: { id: hashtagId },
        data: { isFeatured: featured },
      });
    } catch {
      throw new NotFoundException('Hashtag not found');
    }
  }
}
