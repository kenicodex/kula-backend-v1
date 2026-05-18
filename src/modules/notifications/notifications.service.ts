import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {
    if (!admin.apps.length) {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      if (projectId && privateKey && clientEmail) {
        admin.initializeApp({
          credential: admin.credential.cert({ projectId, privateKey, clientEmail }),
        });
      }
    }
  }

  async create(userId: string, type: string, title: string, body: string, data?: Record<string, any>): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        body,
        relatedBookingId: data?.bookingId,
        relatedOrderId: data?.orderId,
        relatedPostId: data?.postId,
        relatedReviewId: data?.reviewId,
        relatedChefId: data?.chefId,
        relatedUserId: data?.userId,
      },
    });
  }

  async getAll(userId: string, page = 1, limit = 30) {
    const skip = (page - 1) * limit;
    const [data, total, unread] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.notification.count({ where: { userId, isRead: false } }),
    ]);
    return { data, total, unread, page, limit };
  }

  async markRead(id: string, userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  async markAllRead(userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async sendPush(fcmToken: string, title: string, body: string, data?: Record<string, string>): Promise<void> {
    if (!fcmToken || !admin.apps.length) return;
    try {
      await admin.messaging().send({ token: fcmToken, notification: { title, body }, data });
    } catch {
      // silently handle push failure — notification is stored in DB regardless
    }
  }

  async notify(userId: string, fcmToken: string | undefined, type: string, title: string, body: string, data?: Record<string, any>): Promise<void> {
    await this.create(userId, type, title, body, data);
    if (fcmToken) await this.sendPush(fcmToken, title, body, data as Record<string, string>);
  }
}
