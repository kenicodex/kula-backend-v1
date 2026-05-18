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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, dto) {
        const reference = `BK-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)
            .toUpperCase()}`;
        return this.prisma.booking.create({
            data: {
                clientId,
                chefId: dto.chefId,
                serviceType: dto.serviceType,
                hireType: dto.hireType,
                date: new Date(dto.date),
                timeSlot: dto.timeSlot,
                numberOfGuests: dto.numberOfGuests,
                locationAddress: dto.location.address,
                locationCity: dto.location.city,
                locationLat: dto.location.coordinates?.[0],
                locationLng: dto.location.coordinates?.[1],
                occasion: dto.occasion,
                specialInstructions: dto.specialInstructions,
                totalAmount: 0,
                reference,
            },
        });
    }
    async findById(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                client: {
                    select: { id: true, name: true, email: true, avatar: true, phone: true },
                },
                chef: true,
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async findByClient(clientId, status) {
        const where = { clientId };
        if (status)
            where.status = status;
        return this.prisma.booking.findMany({
            where,
            include: { chef: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByChef(chefUserId, status) {
        const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
        if (!chef)
            return [];
        const where = { chefId: chef.id };
        if (status)
            where.status = status;
        return this.prisma.booking.findMany({
            where,
            include: {
                client: {
                    select: { id: true, name: true, email: true, avatar: true, phone: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async confirm(id, chefUserId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { chef: true },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.chef.userId !== chefUserId)
            throw new common_1.ForbiddenException();
        if (booking.status !== 'pending')
            throw new common_1.BadRequestException('Booking is not pending');
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'confirmed' },
        });
    }
    async decline(id, chefUserId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { chef: true },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.chef.userId !== chefUserId)
            throw new common_1.ForbiddenException();
        if (booking.status !== 'pending')
            throw new common_1.BadRequestException('Booking is not pending');
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'cancelled' },
        });
    }
    async updateStatus(id, status) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return this.prisma.booking.update({
            where: { id },
            data: { status: status },
        });
    }
    async cancel(id, userId) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.clientId !== userId)
            throw new common_1.ForbiddenException();
        if (['completed', 'cancelled'].includes(booking.status)) {
            throw new common_1.BadRequestException('Cannot cancel this booking');
        }
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'cancelled' },
        });
    }
    async setPaymentIntent(id, paymentIntentId, amount) {
        return this.prisma.booking.update({
            where: { id },
            data: { paymentIntentId, totalAmount: amount },
        });
    }
    async releaseEscrow(id) {
        return this.prisma.booking.update({
            where: { id },
            data: { escrowStatus: client_1.EscrowStatus.released },
        });
    }
    async getStats(chefUserId) {
        const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
        if (!chef)
            return { total: 0, pending: 0, confirmed: 0, completed: 0 };
        const chefId = chef.id;
        const [total, pending, confirmed, completed] = await Promise.all([
            this.prisma.booking.count({ where: { chefId } }),
            this.prisma.booking.count({ where: { chefId, status: 'pending' } }),
            this.prisma.booking.count({ where: { chefId, status: 'confirmed' } }),
            this.prisma.booking.count({ where: { chefId, status: 'completed' } }),
        ]);
        return { total, pending, confirmed, completed };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map