import { Chef, Hashtag, Review } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly userPublicSelect;
    getPendingChefs(): Promise<({
        user: {
            name: string;
            phone: string | null;
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
    })[]>;
    approveChef(chefId: string): Promise<Chef>;
    rejectChef(chefId: string): Promise<Chef>;
    suspendChef(chefId: string): Promise<Chef>;
    getUsers(role?: string, page?: number, limit?: number): Promise<{
        data: {
            name: string;
            phone: string | null;
            avatar: string | null;
            fcmToken: string | null;
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            isVerified: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    suspendUser(userId: string): Promise<{
        name: string;
        phone: string | null;
        avatar: string | null;
        fcmToken: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reinstateUser(userId: string): Promise<{
        name: string;
        phone: string | null;
        avatar: string | null;
        fcmToken: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unflagReview(reviewId: string): Promise<Review>;
    deleteReview(reviewId: string): Promise<void>;
    getFlaggedReviews(): Promise<({
        chef: {
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
        };
        client: {
            name: string;
            id: string;
        };
    } & {
        comment: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        chefId: string;
        clientId: string;
        bookingId: string;
        isFlagged: boolean;
        flagReason: string | null;
        categoryFoodQuality: number | null;
        categoryPunctuality: number | null;
        categoryCleanliness: number | null;
        categoryCommunication: number | null;
        chefResponse: string | null;
    })[]>;
    getAnalytics(): Promise<{
        totalUsers: number;
        totalChefs: number;
        totalBookings: number;
        completedBookings: number;
        pendingChefApplications: number;
        totalGMV: number;
        totalPlatformFees: number;
    }>;
    banHashtag(hashtagId: string): Promise<Hashtag>;
    featureHashtag(hashtagId: string, featured: boolean): Promise<Hashtag>;
}
