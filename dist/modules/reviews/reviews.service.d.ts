import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, dto: CreateReviewDto): Promise<{
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
    respondToReview(reviewId: string, userId: string, response: string): Promise<{
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
    flagReview(reviewId: string, reason: string): Promise<{
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
    getAverageRating(chefId: string): Promise<{
        average: number;
        count: number;
    }>;
}
