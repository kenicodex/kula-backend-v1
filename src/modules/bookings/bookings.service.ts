import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { BookingStatus, EscrowStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateBookingDto) {
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

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: { id: true, name: true, email: true, avatar: true, phone: true },
        },
        chef: true,
      },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByClient(clientId: string, status?: string) {
    const where: Prisma.BookingWhereInput = { clientId };
    if (status) where.status = status as BookingStatus;
    return this.prisma.booking.findMany({
      where,
      include: { chef: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByChef(chefUserId: string, status?: string) {
    // The controller passes the chef's userId; resolve to chefId first.
    const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
    if (!chef) return [];

    const where: Prisma.BookingWhereInput = { chefId: chef.id };
    if (status) where.status = status as BookingStatus;
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

  async confirm(id: string, chefUserId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { chef: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.chef.userId !== chefUserId) throw new ForbiddenException();
    if (booking.status !== 'pending')
      throw new BadRequestException('Booking is not pending');

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'confirmed' },
    });
  }

  async decline(id: string, chefUserId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { chef: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.chef.userId !== chefUserId) throw new ForbiddenException();
    if (booking.status !== 'pending')
      throw new BadRequestException('Booking is not pending');

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }

  async updateStatus(id: string, status: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    return this.prisma.booking.update({
      where: { id },
      data: { status: status as BookingStatus },
    });
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.clientId !== userId) throw new ForbiddenException();
    if (['completed', 'cancelled'].includes(booking.status)) {
      throw new BadRequestException('Cannot cancel this booking');
    }
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }

  async setPaymentIntent(id: string, paymentIntentId: string, amount: number) {
    return this.prisma.booking.update({
      where: { id },
      data: { paymentIntentId, totalAmount: amount },
    });
  }

  async releaseEscrow(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { escrowStatus: EscrowStatus.released },
    });
  }

  async getStats(chefUserId: string) {
    // The controller passes the chef's userId; resolve to chefId first.
    const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
    if (!chef) return { total: 0, pending: 0, confirmed: 0, completed: 0 };

    const chefId = chef.id;
    const [total, pending, confirmed, completed] = await Promise.all([
      this.prisma.booking.count({ where: { chefId } }),
      this.prisma.booking.count({ where: { chefId, status: 'pending' } }),
      this.prisma.booking.count({ where: { chefId, status: 'confirmed' } }),
      this.prisma.booking.count({ where: { chefId, status: 'completed' } }),
    ]);
    return { total, pending, confirmed, completed };
  }
}
