import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Prisma, DayOfWeek } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChefProfileDto } from './dto/create-chef-profile.dto';
import { UpdateChefProfileDto } from './dto/update-chef-profile.dto';
import { SearchChefsDto } from './dto/search-chefs.dto';

@Injectable()
export class ChefsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(userId: string, dto: CreateChefProfileDto) {
    const existing = await this.prisma.chef.findUnique({ where: { userId } });
    if (existing) throw new ConflictException('Chef profile already exists');

    const minRate = dto.pricing.length
      ? Math.min(...dto.pricing.map((p) => p.rate))
      : undefined;

    return this.prisma.chef.create({
      data: {
        userId,
        bio: dto.bio,
        location: dto.location,
        instantBooking: dto.instantBooking,
        minRate,
        cuisineTypes: {
          create: dto.cuisineTypes.map((cuisine) => ({ cuisine })),
        },
        mealCategories: {
          create: dto.mealCategories.map((mealCategory) => ({ mealCategory })),
        },
        signatureDishes: dto.signatureDishes
          ? { create: dto.signatureDishes.map((dish) => ({ dish })) }
          : undefined,
        serviceTypes: {
          create: dto.serviceTypes.map((serviceType) => ({ serviceType })),
        },
        pricing: {
          create: dto.pricing.map((p) => ({
            hireType: p.hireType,
            rate: p.rate,
            currency: p.currency ?? 'USD',
          })),
        },
      },
      include: {
        cuisineTypes: true,
        mealCategories: true,
        signatureDishes: true,
        serviceTypes: true,
        pricing: true,
        availability: true,
        blockOutDates: true,
      },
    });
  }

  async getProfile(chefId: string) {
    const chef = await this.prisma.chef.findUnique({
      where: { id: chefId },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        cuisineTypes: true,
        mealCategories: true,
        signatureDishes: true,
        serviceTypes: true,
        pricing: true,
        availability: true,
        blockOutDates: true,
        pinnedPosts: true,
      },
    });
    if (!chef) throw new NotFoundException('Chef not found');
    return chef;
  }

  async getProfileByUserId(userId: string) {
    const chef = await this.prisma.chef.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        cuisineTypes: true,
        mealCategories: true,
        signatureDishes: true,
        serviceTypes: true,
        pricing: true,
        availability: true,
        blockOutDates: true,
        pinnedPosts: true,
      },
    });
    if (!chef) throw new NotFoundException('Chef profile not found');
    return chef;
  }

  async updateProfile(userId: string, dto: UpdateChefProfileDto) {
    const chef = await this.prisma.chef.findUnique({ where: { userId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    const {
      cuisineTypes,
      mealCategories,
      signatureDishes,
      serviceTypes,
      pricing,
      availability,
      ...scalar
    } = dto;

    const minRate =
      pricing && pricing.length ? Math.min(...pricing.map((p) => p.rate)) : undefined;

    return this.prisma.chef.update({
      where: { userId },
      data: {
        ...scalar,
        ...(minRate !== undefined ? { minRate } : {}),
        ...(cuisineTypes !== undefined
          ? {
              cuisineTypes: {
                deleteMany: {},
                create: cuisineTypes.map((cuisine) => ({ cuisine })),
              },
            }
          : {}),
        ...(mealCategories !== undefined
          ? {
              mealCategories: {
                deleteMany: {},
                create: mealCategories.map((mealCategory) => ({ mealCategory })),
              },
            }
          : {}),
        ...(signatureDishes !== undefined
          ? {
              signatureDishes: {
                deleteMany: {},
                create: signatureDishes.map((dish) => ({ dish })),
              },
            }
          : {}),
        ...(serviceTypes !== undefined
          ? {
              serviceTypes: {
                deleteMany: {},
                create: serviceTypes.map((serviceType) => ({ serviceType })),
              },
            }
          : {}),
        ...(pricing !== undefined
          ? {
              pricing: {
                deleteMany: {},
                create: pricing.map((p) => ({
                  hireType: p.hireType,
                  rate: p.rate,
                  currency: p.currency ?? 'USD',
                })),
              },
            }
          : {}),
      },
      include: {
        cuisineTypes: true,
        mealCategories: true,
        signatureDishes: true,
        serviceTypes: true,
        pricing: true,
        availability: true,
        blockOutDates: true,
      },
    });
  }

  async search(dto: SearchChefsDto) {
    const {
      q,
      cuisine,
      mealCategory,
      serviceType,
      hireType,
      location,
      minRating,
      sortBy,
      page = 1,
      limit = 20,
    } = dto;

    const where: Prisma.ChefWhereInput = { status: 'approved' };

    if (cuisine) where.cuisineTypes = { some: { cuisine } };
    if (mealCategory) where.mealCategories = { some: { mealCategory } };
    if (serviceType) where.serviceTypes = { some: { serviceType } };
    if (hireType) where.pricing = { some: { hireType } };
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (minRating) where.rating = { gte: minRating };
    if (q) {
      // Mongo $text replaced with case-insensitive contains over bio/location.
      where.OR = [
        { bio: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
      ];
    }

    let orderBy: Prisma.ChefOrderByWithRelationInput = { rating: 'desc' };
    if (sortBy === 'rating') orderBy = { rating: 'desc' };
    else if (sortBy === 'price_asc') orderBy = { minRate: 'asc' };
    else if (sortBy === 'price_desc') orderBy = { minRate: 'desc' };
    else if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.chef.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          cuisineTypes: true,
          mealCategories: true,
          serviceTypes: true,
          pricing: true,
        },
      }),
      this.prisma.chef.count({ where }),
    ]);
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async setAvailability(userId: string, availability: Record<string, any>) {
    const chef = await this.prisma.chef.findUnique({ where: { userId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    const slots = Object.entries(availability)
      .filter(([, v]) => v && typeof v === 'object')
      .map(([dayOfWeek, slot]: [string, any]) => ({
        chefId: chef.id,
        dayOfWeek: dayOfWeek as DayOfWeek,
        startTime: slot.start,
        endTime: slot.end,
        isAvailable: slot.isAvailable !== false,
      }));

    await this.prisma.chefAvailabilitySlot.deleteMany({ where: { chefId: chef.id } });
    if (slots.length) {
      await this.prisma.chefAvailabilitySlot.createMany({ data: slots });
    }

    return this.prisma.chef.findUnique({
      where: { id: chef.id },
      include: { availability: true },
    });
  }

  async addBlockOutDate(userId: string, date: string) {
    const chef = await this.prisma.chef.findUnique({ where: { userId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    await this.prisma.chefBlockOutDate.upsert({
      where: { chefId_date: { chefId: chef.id, date: new Date(date) } },
      create: { chefId: chef.id, date: new Date(date) },
      update: {},
    });

    return this.prisma.chef.findUnique({
      where: { id: chef.id },
      include: { blockOutDates: true },
    });
  }

  async removeBlockOutDate(userId: string, date: string) {
    const chef = await this.prisma.chef.findUnique({ where: { userId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    await this.prisma.chefBlockOutDate.deleteMany({
      where: { chefId: chef.id, date: new Date(date) },
    });

    return this.prisma.chef.findUnique({
      where: { id: chef.id },
      include: { blockOutDates: true },
    });
  }

  async pinPost(userId: string, postId: string) {
    const chef = await this.prisma.chef.findUnique({
      where: { userId },
      include: { pinnedPosts: true },
    });
    if (!chef) throw new NotFoundException('Chef profile not found');
    if (chef.pinnedPosts.length >= 3)
      throw new ForbiddenException('Maximum 3 pinned posts allowed');

    await this.prisma.chefPinnedPost.upsert({
      where: { chefId_postId: { chefId: chef.id, postId } },
      create: { chefId: chef.id, postId },
      update: {},
    });

    return this.prisma.chef.findUnique({
      where: { id: chef.id },
      include: { pinnedPosts: true },
    });
  }

  async unpinPost(userId: string, postId: string) {
    const chef = await this.prisma.chef.findUnique({ where: { userId } });
    if (!chef) throw new NotFoundException('Chef profile not found');

    await this.prisma.chefPinnedPost.deleteMany({
      where: { chefId: chef.id, postId },
    });

    return this.prisma.chef.findUnique({
      where: { id: chef.id },
      include: { pinnedPosts: true },
    });
  }

  async updateRating(chefId: string, newRating: number, reviewCount: number): Promise<void> {
    await this.prisma.chef.update({
      where: { id: chefId },
      data: { rating: newRating, reviewCount },
    });
  }

  async findById(id: string) {
    const chef = await this.prisma.chef.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });
    if (!chef) throw new NotFoundException('Chef not found');
    return chef;
  }
}
