import { GroceryService } from './grocery.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';
export declare class GroceryController {
    private readonly groceryService;
    constructor(groceryService: GroceryService);
    create(user: any, dto: CreateGroceryListDto): Promise<{
        items: {
            name: string;
            id: string;
            quantity: string;
            estimatedCost: number;
            groceryListId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.GroceryListStatus;
        chefId: string;
        clientId: string;
        estimatedTotal: number;
        receiptUrl: string | null;
        actualTotal: number | null;
        paymentMethod: import(".prisma/client").$Enums.GroceryPaymentMethod;
        budgetCap: number | null;
        bookingId: string;
    }>;
    getByBooking(bookingId: string): Promise<{
        items: {
            name: string;
            id: string;
            quantity: string;
            estimatedCost: number;
            groceryListId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.GroceryListStatus;
        chefId: string;
        clientId: string;
        estimatedTotal: number;
        receiptUrl: string | null;
        actualTotal: number | null;
        paymentMethod: import(".prisma/client").$Enums.GroceryPaymentMethod;
        budgetCap: number | null;
        bookingId: string;
    }>;
    approve(id: string, user: any): Promise<{
        items: {
            name: string;
            id: string;
            quantity: string;
            estimatedCost: number;
            groceryListId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.GroceryListStatus;
        chefId: string;
        clientId: string;
        estimatedTotal: number;
        receiptUrl: string | null;
        actualTotal: number | null;
        paymentMethod: import(".prisma/client").$Enums.GroceryPaymentMethod;
        budgetCap: number | null;
        bookingId: string;
    }>;
    uploadReceipt(id: string, user: any, body: {
        receiptUrl: string;
        actualTotal: number;
    }): Promise<{
        items: {
            name: string;
            id: string;
            quantity: string;
            estimatedCost: number;
            groceryListId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.GroceryListStatus;
        chefId: string;
        clientId: string;
        estimatedTotal: number;
        receiptUrl: string | null;
        actualTotal: number | null;
        paymentMethod: import(".prisma/client").$Enums.GroceryPaymentMethod;
        budgetCap: number | null;
        bookingId: string;
    }>;
}
