export declare class GroceryItemDto {
    name: string;
    quantity: string;
    estimatedCost: number;
}
export declare class CreateGroceryListDto {
    bookingId: string;
    items: GroceryItemDto[];
    budgetCap?: number;
    paymentMethod?: string;
}
