import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateReviewDto) {
    const existing = await this.prisma.review.findFirst({
      where: { clientId, bookingId: dto.bookingId },
    });
    if (existing) throw new ConflictException('You have already reviewed this booking');

    const { categories } = dto;
    return this.prisma.review.create({
      data: {
        clientId,
        chefId: dto.chefId,
        bookingId: dto.bookingId,
        rating: dto.rating,
        comment: dto.comment,
        categoryFoodQuality: categories?.foodQuality,
        categoryPunctuality: categories?.punctuality,
        categoryCleanliness: categories?.cleanliness,
        categoryCommunication: categories?.communication,
      },
    });
  }

  async getChefReviews(chefId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { chefId, isFlagged: false };
    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          client: { select: { id: true, name: true, avatar: true } },
        },
      }),
      this.prisma.review.count({ where }),
    ]);
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async respondToReview(reviewId: string, userId: string, response: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: { chef: true },
    });
    if (!review) throw new NotFoundException('Review not found');
    if (review.chef.userId !== userId) throw new ForbiddenException();

    return this.prisma.review.update({
      where: { id: reviewId },
      data: { chefResponse: response },
    });
  }

  async flagReview(reviewId: string, reason: string) {
    const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { isFlagged: true, flagReason: reason },
    });
  }

  async getAverageRating(chefId: string): Promise<{ average: number; count: number }> {
    const result = await this.prisma.review.aggregate({
      where: { chefId, isFlagged: false },
      _avg: { rating: true },
      _count: true,
    });
    const avg = result._avg.rating;
    if (!avg) return { average: 0, count: result._count };
    return { average: Math.round(avg * 10) / 10, count: result._count };
  }
}
