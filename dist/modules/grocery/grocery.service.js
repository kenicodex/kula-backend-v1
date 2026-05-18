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
exports.GroceryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let GroceryService = class GroceryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(chefUserId, _bookingIdArg, dto) {
        const existing = await this.prisma.groceryList.findUnique({
            where: { bookingId: dto.bookingId },
        });
        if (existing)
            throw new common_1.BadRequestException('Grocery list already exists for this booking');
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
        if (!chef)
            throw new common_1.NotFoundException('Chef profile not found');
        const estimatedTotal = dto.items.reduce((sum, item) => sum + item.estimatedCost, 0);
        return this.prisma.groceryList.create({
            data: {
                bookingId: dto.bookingId,
                chefId: chef.id,
                clientId: booking.clientId,
                estimatedTotal,
                budgetCap: dto.budgetCap,
                paymentMethod: dto.paymentMethod ?? 'app_payment',
                items: {
                    create: dto.items.map((i) => ({
                        name: i.name,
                        quantity: i.quantity,
                        estimatedCost: i.estimatedCost,
                    })),
                },
            },
            include: { items: true },
        });
    }
    async getByBooking(bookingId) {
        const list = await this.prisma.groceryList.findUnique({
            where: { bookingId },
            include: { items: true },
        });
        if (!list)
            throw new common_1.NotFoundException('Grocery list not found');
        return list;
    }
    async findById(id) {
        const list = await this.prisma.groceryList.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!list)
            throw new common_1.NotFoundException('Grocery list not found');
        return list;
    }
    async approve(groceryListId, clientId) {
        const list = await this.prisma.groceryList.findUnique({
            where: { id: groceryListId },
        });
        if (!list)
            throw new common_1.NotFoundException('Grocery list not found');
        if (list.clientId !== clientId)
            throw new common_1.ForbiddenException();
        if (list.status !== 'pending_approval')
            throw new common_1.BadRequestException('List is not pending approval');
        return this.prisma.groceryList.update({
            where: { id: groceryListId },
            data: { status: 'approved' },
            include: { items: true },
        });
    }
    async uploadReceipt(groceryListId, chefUserId, receiptUrl, actualTotal) {
        const list = await this.prisma.groceryList.findUnique({
            where: { id: groceryListId },
            include: { chef: true },
        });
        if (!list)
            throw new common_1.NotFoundException('Grocery list not found');
        if (list.chef.userId !== chefUserId)
            throw new common_1.ForbiddenException();
        return this.prisma.groceryList.update({
            where: { id: groceryListId },
            data: {
                receiptUrl,
                actualTotal,
                status: 'purchased',
            },
            include: { items: true },
        });
    }
    async markReimbursed(groceryListId) {
        const list = await this.prisma.groceryList.findUnique({
            where: { id: groceryListId },
        });
        if (!list)
            throw new common_1.NotFoundException('Grocery list not found');
        return this.prisma.groceryList.update({
            where: { id: groceryListId },
            data: { status: 'reimbursed' },
            include: { items: true },
        });
    }
};
exports.GroceryService = GroceryService;
exports.GroceryService = GroceryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroceryService);
//# sourceMappingURL=grocery.service.js.map