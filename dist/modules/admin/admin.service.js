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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    userPublicSelect = {
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
    };
    async getPendingChefs() {
        return this.prisma.chef.findMany({
            where: { status: client_1.ChefStatus.pending },
            include: {
                user: { select: { id: true, name: true, email: true, avatar: true, phone: true } },
            },
        });
    }
    async approveChef(chefId) {
        try {
            return await this.prisma.chef.update({
                where: { id: chefId },
                data: { status: client_1.ChefStatus.approved },
            });
        }
        catch {
            throw new common_1.NotFoundException('Chef not found');
        }
    }
    async rejectChef(chefId) {
        try {
            return await this.prisma.chef.update({
                where: { id: chefId },
                data: { status: client_1.ChefStatus.rejected },
            });
        }
        catch {
            throw new common_1.NotFoundException('Chef not found');
        }
    }
    async suspendChef(chefId) {
        try {
            return await this.prisma.chef.update({
                where: { id: chefId },
                data: { status: client_1.ChefStatus.suspended },
            });
        }
        catch {
            throw new common_1.NotFoundException('Chef not found');
        }
    }
    async getUsers(role, page = 1, limit = 30) {
        const skip = (page - 1) * limit;
        const where = role ? { role: role } : {};
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
    async suspendUser(userId) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { isActive: false },
                select: this.userPublicSelect,
            });
        }
        catch {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async reinstateUser(userId) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { isActive: true },
                select: this.userPublicSelect,
            });
        }
        catch {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async unflagReview(reviewId) {
        try {
            return await this.prisma.review.update({
                where: { id: reviewId },
                data: { isFlagged: false },
            });
        }
        catch {
            throw new common_1.NotFoundException('Review not found');
        }
    }
    async deleteReview(reviewId) {
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
        const [totalUsers, totalChefs, totalBookings, completedBookings, pendingChefApplications, revenue] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.chef.count({ where: { status: client_1.ChefStatus.approved } }),
            this.prisma.booking.count(),
            this.prisma.booking.count({ where: { status: 'completed' } }),
            this.prisma.chef.count({ where: { status: client_1.ChefStatus.pending } }),
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
    async banHashtag(hashtagId) {
        try {
            return await this.prisma.hashtag.update({
                where: { id: hashtagId },
                data: { isBanned: true, isActive: false },
            });
        }
        catch {
            throw new common_1.NotFoundException('Hashtag not found');
        }
    }
    async featureHashtag(hashtagId, featured) {
        try {
            return await this.prisma.hashtag.update({
                where: { id: hashtagId },
                data: { isFeatured: featured },
            });
        }
        catch {
            throw new common_1.NotFoundException('Hashtag not found');
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map