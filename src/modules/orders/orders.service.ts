import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrderStatus, FulfillmentType, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateOrderDto) {
    const reference = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;
    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const deliveryFee = dto.deliveryFee ?? 0;
    const platformFee = subtotal * 0.1;
    const total = subtotal + deliveryFee + platformFee;

    return this.prisma.order.create({
      data: {
        clientId,
        chefId: dto.chefId,
        fulfillmentType: dto.fulfillmentType as FulfillmentType,
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

  async findById(id: string) {
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
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByClient(clientId: string, status?: string) {
    const where: Prisma.OrderWhereInput = { clientId };
    if (status) where.status = status as OrderStatus;
    return this.prisma.order.findMany({
      where,
      include: { chef: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByChef(chefUserId: string, status?: string) {
    // Controller passes the chef's userId; resolve to chefId.
    const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
    if (!chef) return [];

    const where: Prisma.OrderWhereInput = { chefId: chef.id };
    if (status) where.status = status as OrderStatus;
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

  async updateStatus(id: string, status: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { chef: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    const isOwner =
      order.clientId === userId || order.chef.userId === userId;
    if (!isOwner) throw new ForbiddenException();
    return this.prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
    });
  }

  async cancel(id: string, clientId: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.clientId !== clientId) throw new ForbiddenException();
    return this.prisma.order.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
}
