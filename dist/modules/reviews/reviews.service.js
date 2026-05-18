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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, dto) {
        const existing = await this.prisma.review.findFirst({
            where: { clientId, bookingId: dto.bookingId },
        });
        if (existing)
            throw new common_1.ConflictException('You have already reviewed this booking');
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
    async getChefReviews(chefId, page = 1, limit = 20) {
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
    async respondToReview(reviewId, userId, response) {
        const review = await this.prisma.review.findUnique({
            where: { id: reviewId },
            include: { chef: true },
        });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        if (review.chef.userId !== userId)
            throw new common_1.ForbiddenException();
        return this.prisma.review.update({
            where: { id: reviewId },
            data: { chefResponse: response },
        });
    }
    async flagReview(reviewId, reason) {
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return this.prisma.review.update({
            where: { id: reviewId },
            data: { isFlagged: true, flagReason: reason },
        });
    }
    async getAverageRating(chefId) {
        const result = await this.prisma.review.aggregate({
            where: { chefId, isFlagged: false },
            _avg: { rating: true },
            _count: true,
        });
        const avg = result._avg.rating;
        if (!avg)
            return { average: 0, count: result._count };
        return { average: Math.round(avg * 10) / 10, count: result._count };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map