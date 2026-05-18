import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: UpdateProfileDto): Promise<User> {
    const { dietaryRestrictions, allergies, ...scalar } = data;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...scalar,
        ...(dietaryRestrictions !== undefined
          ? {
              dietaryRestrictions: {
                deleteMany: {},
                create: dietaryRestrictions.map((restriction) => ({ restriction })),
              },
            }
          : {}),
        ...(allergies !== undefined
          ? {
              allergies: {
                deleteMany: {},
                create: allergies.map((allergy) => ({ allergy })),
              },
            }
          : {}),
      },
      include: { dietaryRestrictions: true, allergies: true, addressBook: true },
    });
  }

  async findAll(where: Prisma.UserWhereInput = {}) {
    return this.prisma.user.findMany({
      where,
      // Exclude password — Prisma doesn't have native `select: -password`, so list fields explicitly.
      select: {
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
      },
    });
  }
}
