import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getAll(user: any, page?: number, limit?: number): Promise<{
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
    markAllRead(user: any): Promise<void>;
    markRead(id: string, user: any): Promise<void>;
}
