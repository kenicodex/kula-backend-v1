import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Conversation, Message, MessageType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagingService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateConversation(userId1: string, userId2: string, bookingId?: string): Promise<Conversation> {
    // Find a conversation where both users are participants.
    const existing = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: userId1 } } },
          { participants: { some: { userId: userId2 } } },
        ],
      },
    });
    if (existing) return existing;

    return this.prisma.conversation.create({
      data: {
        bookingId,
        participants: {
          create: [{ userId: userId1 }, { userId: userId2 }],
        },
      },
    });
  }

  async sendMessage(conversationId: string, senderId: string, text: string, mediaUrl?: string, type: string = 'text'): Promise<Message> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const isParticipant = conversation.participants.some((p) => p.userId === senderId);
    if (!isParticipant) throw new ForbiddenException();

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        text,
        mediaUrl,
        type: type as MessageType,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageId: message.id },
    });

    return message;
  }

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      orderBy: { updatedAt: 'desc' },
      include: {
        participants: {
          include: {
            user: { select: { id: true, name: true, avatar: true, role: true } },
          },
        },
        lastMessage: true,
      },
    });
  }

  async getMessages(conversationId: string, userId: string, page = 1, limit = 50) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const isParticipant = conversation.participants.some((p) => p.userId === userId);
    if (!isParticipant) throw new ForbiddenException();

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { sender: { select: { id: true, name: true, avatar: true } } },
      }),
      this.prisma.message.count({ where: { conversationId } }),
    ]);
    return { data: data.reverse(), total, page, limit };
  }

  async markRead(conversationId: string, userId: string): Promise<void> {
    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });
  }

  async acceptRequest(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const isParticipant = conversation.participants.some((p) => p.userId === userId);
    if (!isParticipant) throw new ForbiddenException();
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { isRequestAccepted: true },
    });
  }

  async declineRequest(conversationId: string, userId: string): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const isParticipant = conversation.participants.some((p) => p.userId === userId);
    if (!isParticipant) throw new ForbiddenException();
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { isRequestDeclined: true },
    });
  }
}
