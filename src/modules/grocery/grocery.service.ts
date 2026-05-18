import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { GroceryPaymentMethod } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';

@Injectable()
export class GroceryService {
  constructor(private readonly prisma: PrismaService) {}

  // NOTE: original controller passed (user.userId, dto.bookingId, dto). To keep the
  // controller signature, the second arg is treated as bookingId (it was already a
  // bug in the Mongoose version — clientId was wrong). We resolve the actual clientId
  // from the booking record.
  // TODO(prisma): verify the controller's argument order against intended business logic.
  async create(chefUserId: string, _bookingIdArg: string, dto: CreateGroceryListDto) {
    const existing = await this.prisma.groceryList.findUnique({
      where: { bookingId: dto.bookingId },
    });
    if (existing)
      throw new BadRequestException('Grocery list already exists for this booking');

    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) throw new NotFoundException('Booking not found');

    const chef = await this.prisma.chef.findUnique({ where: { userId: chefUserId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    const estimatedTotal = dto.items.reduce((sum, item) => sum + item.estimatedCost, 0);

    return this.prisma.groceryList.create({
      data: {
        bookingId: dto.bookingId,
        chefId: chef.id,
        clientId: booking.clientId,
        estimatedTotal,
        budgetCap: dto.budgetCap,
        paymentMethod: (dto.paymentMethod as GroceryPaymentMethod) ?? 'app_payment',
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

  async getByBooking(bookingId: string) {
    const list = await this.prisma.groceryList.findUnique({
      where: { bookingId },
      include: { items: true },
    });
    if (!list) throw new NotFoundException('Grocery list not found');
    return list;
  }

  async findById(id: string) {
    const list = await this.prisma.groceryList.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!list) throw new NotFoundException('Grocery list not found');
    return list;
  }

  async approve(groceryListId: string, clientId: string) {
    const list = await this.prisma.groceryList.findUnique({
      where: { id: groceryListId },
    });
    if (!list) throw new NotFoundException('Grocery list not found');
    if (list.clientId !== clientId) throw new ForbiddenException();
    if (list.status !== 'pending_approval')
      throw new BadRequestException('List is not pending approval');

    return this.prisma.groceryList.update({
      where: { id: groceryListId },
      data: { status: 'approved' },
      include: { items: true },
    });
  }

  async uploadReceipt(
    groceryListId: string,
    chefUserId: string,
    receiptUrl: string,
    actualTotal: number,
  ) {
    const list = await this.prisma.groceryList.findUnique({
      where: { id: groceryListId },
      include: { chef: true },
    });
    if (!list) throw new NotFoundException('Grocery list not found');
    if (list.chef.userId !== chefUserId) throw new ForbiddenException();

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

  async markReimbursed(groceryListId: string) {
    const list = await this.prisma.groceryList.findUnique({
      where: { id: groceryListId },
    });
    if (!list) throw new NotFoundException('Grocery list not found');
    return this.prisma.groceryList.update({
      where: { id: groceryListId },
      data: { status: 'reimbursed' },
      include: { items: true },
    });
  }
}
