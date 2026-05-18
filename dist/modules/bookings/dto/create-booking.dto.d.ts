export declare class CreateBookingDto {
    chefId: string;
    serviceType: string;
    hireType: string;
    date: string;
    timeSlot?: string;
    numberOfGuests: number;
    location: {
        address: string;
        city: string;
        coordinates?: [number, number];
    };
    occasion?: string;
    specialInstructions?: string;
}
