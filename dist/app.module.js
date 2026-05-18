"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const chefs_module_1 = require("./modules/chefs/chefs.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const orders_module_1 = require("./modules/orders/orders.module");
const payments_module_1 = require("./modules/payments/payments.module");
const grocery_module_1 = require("./modules/grocery/grocery.module");
const feed_module_1 = require("./modules/feed/feed.module");
const hashtags_module_1 = require("./modules/hashtags/hashtags.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const messaging_module_1 = require("./modules/messaging/messaging.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            chefs_module_1.ChefsModule,
            bookings_module_1.BookingsModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            grocery_module_1.GroceryModule,
            feed_module_1.FeedModule,
            hashtags_module_1.HashtagsModule,
            reviews_module_1.ReviewsModule,
            messaging_module_1.MessagingModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map