import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAnalytics(): Promise<{
        totalUsers: number;
        totalChefs: number;
        totalBookings: number;
        completedBookings: number;
        pendingChefApplications: number;
        totalGMV: number;
        totalPlatformFees: number;
    }>;
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
    approveChef(id: string): Promise<{
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
    rejectChef(id: string): Promise<{
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
    suspendChef(id: string): Promise<{
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
    suspendUser(id: string): Promise<{
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
    reinstateUser(id: string): Promise<{
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
    unflagReview(id: string): Promise<{
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
    }>;
    deleteReview(id: string): Promise<void>;
    banHashtag(id: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        useCount: number;
        category: import(".prisma/client").$Enums.HashtagCategory;
        isBanned: boolean;
        isFeatured: boolean;
    }>;
    featureHashtag(id: string, body: {
        featured: boolean;
    }): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        useCount: number;
        category: import(".prisma/client").$Enums.HashtagCategory;
        isBanned: boolean;
        isFeatured: boolean;
    }>;
}
