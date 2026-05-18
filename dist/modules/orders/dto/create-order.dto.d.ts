export declare class CreateOrderDto {
    chefId: string;
    items: {
        menuItemId: string;
        name: string;
        quantity: number;
        unitPrice: number;
    }[];
    fulfillmentType: string;
    deliveryAddress?: {
        address: string;
        city: string;
        coordinates?: [number, number];
    };
    pickupTime?: string;
    deliveryFee?: number;
}
