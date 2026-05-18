export declare class CreateChefProfileDto {
    bio: string;
    cuisineTypes: string[];
    mealCategories: string[];
    signatureDishes?: string[];
    serviceTypes: string[];
    pricing: {
        hireType: string;
        rate: number;
        currency?: string;
    }[];
    location?: string;
    instantBooking?: boolean;
    availability?: Record<string, any>;
}
