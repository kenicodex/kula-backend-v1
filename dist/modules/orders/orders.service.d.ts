import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, dto: CreateOrderDto): Promise<{
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
    findById(id: string): Promise<{
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
    findByClient(clientId: string, status?: string): Promise<({
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
    findByChef(chefUserId: string, status?: string): Promise<({
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
    updateStatus(id: string, status: string, userId: string): Promise<{
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
    cancel(id: string, clientId: string): Promise<{
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
