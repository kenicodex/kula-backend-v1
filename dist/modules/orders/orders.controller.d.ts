import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, dto: CreateOrderDto): Promise<{
        items: {
            name: string;
            id: string;
            total: number;
            menuItemId: string | null;
            quantity: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    }>;
    getMyOrders(user: any, status?: string): Promise<({
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
        items: {
            name: string;
            id: string;
            total: number;
            menuItemId: string | null;
            quantity: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    })[]>;
    getChefOrders(user: any, status?: string): Promise<({
        client: {
            name: string;
            phone: string | null;
            avatar: string | null;
            id: string;
            email: string;
        };
        items: {
            name: string;
            id: string;
            total: number;
            menuItemId: string | null;
            quantity: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    })[]>;
    findOne(id: string): Promise<{
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
            phone: string | null;
            avatar: string | null;
            id: string;
            email: string;
        };
        items: {
            name: string;
            id: string;
            total: number;
            menuItemId: string | null;
            quantity: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    }>;
    updateStatus(id: string, user: any, body: {
        status: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    }>;
    cancel(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        platformFee: number | null;
        paymentIntentId: string | null;
        reference: string | null;
        chefId: string;
        clientId: string;
        fulfillmentType: import(".prisma/client").$Enums.FulfillmentType;
        deliveryAddress: string | null;
        deliveryCity: string | null;
        deliveryLat: number | null;
        deliveryLng: number | null;
        pickupTime: Date | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
    }>;
}
