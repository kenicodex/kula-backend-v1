import { MessagingService } from './messaging.service';
export declare class MessagingController {
    private readonly messagingService;
    constructor(messagingService: MessagingService);
    getConversations(user: any): Promise<({
        lastMessage: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.MessageType;
            text: string | null;
            conversationId: string;
            mediaUrl: string | null;
            isRead: boolean;
            senderId: string;
        } | null;
        participants: ({
            user: {
                name: string;
                avatar: string | null;
                id: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            userId: string;
            joinedAt: Date;
            conversationId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string | null;
        lastMessageId: string | null;
        isRequestAccepted: boolean;
        isRequestDeclined: boolean;
    })[]>;
    startConversation(user: any, body: {
        recipientId: string;
        bookingId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string | null;
        lastMessageId: string | null;
        isRequestAccepted: boolean;
        isRequestDeclined: boolean;
    }>;
    getMessages(id: string, user: any, page?: number, limit?: number): Promise<{
        data: ({
            sender: {
                name: string;
                avatar: string | null;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.MessageType;
            text: string | null;
            conversationId: string;
            mediaUrl: string | null;
            isRead: boolean;
            senderId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    sendMessage(id: string, user: any, body: {
        text: string;
        mediaUrl?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.MessageType;
        text: string | null;
        conversationId: string;
        mediaUrl: string | null;
        isRead: boolean;
        senderId: string;
    }>;
    markRead(id: string, user: any): Promise<void>;
    acceptRequest(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string | null;
        lastMessageId: string | null;
        isRequestAccepted: boolean;
        isRequestDeclined: boolean;
    }>;
    declineRequest(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string | null;
        lastMessageId: string | null;
        isRequestAccepted: boolean;
        isRequestDeclined: boolean;
    }>;
}
