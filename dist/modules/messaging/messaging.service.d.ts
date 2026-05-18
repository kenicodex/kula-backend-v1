import { Conversation, Message } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MessagingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOrCreateConversation(userId1: string, userId2: string, bookingId?: string): Promise<Conversation>;
    sendMessage(conversationId: string, senderId: string, text: string, mediaUrl?: string, type?: string): Promise<Message>;
    getConversations(userId: string): Promise<({
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
    getMessages(conversationId: string, userId: string, page?: number, limit?: number): Promise<{
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
    markRead(conversationId: string, userId: string): Promise<void>;
    acceptRequest(conversationId: string, userId: string): Promise<Conversation>;
    declineRequest(conversationId: string, userId: string): Promise<Conversation>;
}
