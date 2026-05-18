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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, dto) {
        const reference = `ORD-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)
            .toUpperCase()}`;
        const subtotal = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const deliveryFee = dto.deliveryFee ?? 0;
        const platformFee = subtotal * 0.1;
        const total = subtotal + deliveryFee + platformFee;
        return this.prisma.order.create({
            data: {
                clientId,
                chefId: dto.chefId,
                fulfillmentType: dto.fulfillmentType,
                deliveryAddress: dto.deliveryAddress?.address,
                deliveryCity: dto.deliveryAddress?.city,
                deliveryLat: dto.deliveryAddress?.coordinates?.[0],
                deliveryLng: dto.deliveryAddress?.coordinates?.[1],
                pickupTime: dto.pickupTime ? new Date(dto.pickupTime) : undefined,
                subtotal,
                deliveryFee,
                platformFee,
                total,
                reference,
                items: {
                    create: dto.items.map((i) => ({
                        menuItemId: i.menuItemId,
                        name: i.name,
                        quantity: i.quantity,
                        unitPrice: i.unitPrice,
                        total: i.quantity * i.unitPrice,
                    })),
                },
            },
            include: { items: true },
        });
    }
    async findById(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                client: {
                    select: { id: true, name: true, email: true, avatar: true, phone: true },
                },
                chef: true,
                items: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async findByClient(clientId, status) {
        const where = { clientId };
        if (status)
            where.status = status;
        return this.prisma.order.findMany({
            where,
            include: { chef: true, items: true },
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
        return this.prisma.order.findMany({
            where,
            include: {
                client: {
                    select: { id: true, name: true, email: true, avatar: true, phone: true },
                },
                items: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { chef: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const isOwner = order.clientId === userId || order.chef.userId === userId;
        if (!isOwner)
            throw new common_1.ForbiddenException();
        return this.prisma.order.update({
            where: { id },
            data: { status: status },
        });
    }
    async cancel(id, clientId) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.clientId !== clientId)
            throw new common_1.ForbiddenException();
        return this.prisma.order.update({
            where: { id },
            data: { status: 'cancelled' },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map