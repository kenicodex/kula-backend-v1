import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroceryListDto } from './dto/create-grocery-list.dto';
export declare class GroceryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(chefUserId: string, _bookingIdArg: string, dto: CreateGroceryListDto): Promise<{
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
    findById(id: string): Promise<{
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
    approve(groceryListId: string, clientId: string): Promise<{
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
    uploadReceipt(groceryListId: string, chefUserId: string, receiptUrl: string, actualTotal: number): Promise<{
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
    markReimbursed(groceryListId: string): Promise<{
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
