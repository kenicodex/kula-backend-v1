import { Notification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, type: string, title: string, body: string, data?: Record<string, any>): Promise<Notification>;
    getAll(userId: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: string;
            isRead: boolean;
            title: string;
            body: string;
            relatedBookingId: string | null;
            relatedOrderId: string | null;
            relatedPostId: string | null;
            relatedReviewId: string | null;
            relatedChefId: string | null;
            relatedUserId: string | null;
        }[];
        total: number;
        unread: number;
        page: number;
        limit: number;
    }>;
    markRead(id: string, userId: string): Promise<void>;
    markAllRead(userId: string): Promise<void>;
    sendPush(fcmToken: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
    notify(userId: string, fcmToken: string | undefined, type: string, title: string, body: string, data?: Record<string, any>): Promise<void>;
}
