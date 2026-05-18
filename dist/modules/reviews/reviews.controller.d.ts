import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getChefReviews(chefId: string, page?: number, limit?: number): Promise<{
        data: ({
            client: {
                name: string;
                avatar: string | null;
                id: string;
            };
        } & {
            comment: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            chefId: string;
            clientId: string;
            bookingId: string;
            isFlagged: boolean;
            flagReason: string | null;
            categoryFoodQuality: number | null;
            categoryPunctuality: number | null;
            categoryCleanliness: number | null;
            categoryCommunication: number | null;
            chefResponse: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getAverageRating(chefId: string): Promise<{
        average: number;
        count: number;
    }>;
    create(user: any, dto: CreateReviewDto): Promise<{
        comment: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        chefId: string;
        clientId: string;
        bookingId: string;
        isFlagged: boolean;
        flagReason: string | null;
        categoryFoodQuality: number | null;
        categoryPunctuality: number | null;
        categoryCleanliness: number | null;
        categoryCommunication: number | null;
        chefResponse: string | null;
    }>;
    respond(id: string, user: any, body: {
        response: string;
    }): Promise<{
        comment: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        chefId: string;
        clientId: string;
        bookingId: string;
        isFlagged: boolean;
        flagReason: string | null;
        categoryFoodQuality: number | null;
        categoryPunctuality: number | null;
        categoryCleanliness: number | null;
        categoryCommunication: number | null;
        chefResponse: string | null;
    }>;
    flag(id: string, body: {
        reason: string;
    }): Promise<{
        comment: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        chefId: string;
        clientId: string;
        bookingId: string;
        isFlagged: boolean;
        flagReason: string | null;
        categoryFoodQuality: number | null;
        categoryPunctuality: number | null;
        categoryCleanliness: number | null;
        categoryCommunication: number | null;
        chefResponse: string | null;
    }>;
}
