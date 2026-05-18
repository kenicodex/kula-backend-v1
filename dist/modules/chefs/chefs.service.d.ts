import { PrismaService } from '../../prisma/prisma.service';
import { CreateChefProfileDto } from './dto/create-chef-profile.dto';
import { UpdateChefProfileDto } from './dto/update-chef-profile.dto';
import { SearchChefsDto } from './dto/search-chefs.dto';
export declare class ChefsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProfile(userId: string, dto: CreateChefProfileDto): Promise<{
        cuisineTypes: {
            id: string;
            chefId: string;
            cuisine: string;
        }[];
        mealCategories: {
            id: string;
            chefId: string;
            mealCategory: string;
        }[];
        signatureDishes: {
            id: string;
            chefId: string;
            dish: string;
        }[];
        serviceTypes: {
            id: string;
            serviceType: string;
            chefId: string;
        }[];
        pricing: {
            id: string;
            hireType: string;
            chefId: string;
            rate: number;
            currency: string;
        }[];
        availability: {
            id: string;
            chefId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }>;
    getProfile(chefId: string): Promise<{
        user: {
            name: string;
            avatar: string | null;
            id: string;
            email: string;
        };
        cuisineTypes: {
            id: string;
            chefId: string;
            cuisine: string;
        }[];
        mealCategories: {
            id: string;
            chefId: string;
            mealCategory: string;
        }[];
        signatureDishes: {
            id: string;
            chefId: string;
            dish: string;
        }[];
        serviceTypes: {
            id: string;
            serviceType: string;
            chefId: string;
        }[];
        pricing: {
            id: string;
            hireType: string;
            chefId: string;
            rate: number;
            currency: string;
        }[];
        availability: {
            id: string;
            chefId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
        pinnedPosts: {
            chefId: string;
            postId: string;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }>;
    getProfileByUserId(userId: string): Promise<{
        user: {
            name: string;
            avatar: string | null;
            id: string;
            email: string;
        };
        cuisineTypes: {
            id: string;
            chefId: string;
            cuisine: string;
        }[];
        mealCategories: {
            id: string;
            chefId: string;
            mealCategory: string;
        }[];
        signatureDishes: {
            id: string;
            chefId: string;
            dish: string;
        }[];
        serviceTypes: {
            id: string;
            serviceType: string;
            chefId: string;
        }[];
        pricing: {
            id: string;
            hireType: string;
            chefId: string;
            rate: number;
            currency: string;
        }[];
        availability: {
            id: string;
            chefId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
        pinnedPosts: {
            chefId: string;
            postId: string;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }>;
    updateProfile(userId: string, dto: UpdateChefProfileDto): Promise<{
        cuisineTypes: {
            id: string;
            chefId: string;
            cuisine: string;
        }[];
        mealCategories: {
            id: string;
            chefId: string;
            mealCategory: string;
        }[];
        signatureDishes: {
            id: string;
            chefId: string;
            dish: string;
        }[];
        serviceTypes: {
            id: string;
            serviceType: string;
            chefId: string;
        }[];
        pricing: {
            id: string;
            hireType: string;
            chefId: string;
            rate: number;
            currency: string;
        }[];
        availability: {
            id: string;
            chefId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }>;
    search(dto: SearchChefsDto): Promise<{
        data: ({
            user: {
                name: string;
                avatar: string | null;
                id: string;
            };
            cuisineTypes: {
                id: string;
                chefId: string;
                cuisine: string;
            }[];
            mealCategories: {
                id: string;
                chefId: string;
                mealCategory: string;
            }[];
            serviceTypes: {
                id: string;
                serviceType: string;
                chefId: string;
            }[];
            pricing: {
                id: string;
                hireType: string;
                chefId: string;
                rate: number;
                currency: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bio: string | null;
            location: string | null;
            status: import(".prisma/client").$Enums.ChefStatus;
            rating: number;
            reviewCount: number;
            bookingCount: number;
            instantBooking: boolean;
            minRate: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    setAvailability(userId: string, availability: Record<string, any>): Promise<({
        availability: {
            id: string;
            chefId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }) | null>;
    addBlockOutDate(userId: string, date: string): Promise<({
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }) | null>;
    removeBlockOutDate(userId: string, date: string): Promise<({
        blockOutDates: {
            id: string;
            date: Date;
            chefId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }) | null>;
    pinPost(userId: string, postId: string): Promise<({
        pinnedPosts: {
            chefId: string;
            postId: string;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }) | null>;
    unpinPost(userId: string, postId: string): Promise<({
        pinnedPosts: {
            chefId: string;
            postId: string;
            sortOrder: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }) | null>;
    updateRating(chefId: string, newRating: number, reviewCount: number): Promise<void>;
    findById(id: string): Promise<{
        user: {
            name: string;
            avatar: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bio: string | null;
        location: string | null;
        status: import(".prisma/client").$Enums.ChefStatus;
        rating: number;
        reviewCount: number;
        bookingCount: number;
        instantBooking: boolean;
        minRate: number | null;
    }>;
}
