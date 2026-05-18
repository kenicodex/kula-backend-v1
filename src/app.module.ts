import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChefsModule } from './modules/chefs/chefs.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { GroceryModule } from './modules/grocery/grocery.module';
import { FeedModule } from './modules/feed/feed.module';
import { HashtagsModule } from './modules/hashtags/hashtags.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChefsModule,
    BookingsModule,
    OrdersModule,
    PaymentsModule,
    GroceryModule,
    FeedModule,
    HashtagsModule,
    ReviewsModule,
    MessagingModule,
    NotificationsModule,
    AdminModule,
  ],
})
export class AppModule {}
