import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagingService } from './messaging.service';
export declare class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagingService;
    private readonly jwtService;
    server: Server;
    private userSockets;
    constructor(messagingService: MessagingService, jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(client: Socket, data: {
        conversationId: string;
    }): {
        joined: string;
    };
    handleLeaveConversation(client: Socket, data: {
        conversationId: string;
    }): void;
    handleSendMessage(client: Socket, data: {
        conversationId: string;
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
    } | undefined>;
    handleMarkRead(client: Socket, data: {
        conversationId: string;
    }): Promise<void>;
    emitToUser(userId: string, event: string, data: any): void;
}
