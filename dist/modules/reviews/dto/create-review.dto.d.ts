export declare class CreateReviewDto {
    bookingId: string;
    chefId: string;
    rating: number;
    comment?: string;
    categories?: {
        foodQuality?: number;
        punctuality?: number;
        cleanliness?: number;
        communication?: number;
    };
}
