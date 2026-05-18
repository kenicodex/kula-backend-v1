import { HashtagsService } from './hashtags.service';
export declare class HashtagsController {
    private readonly hashtagsService;
    constructor(hashtagsService: HashtagsService);
    trending(limit?: number): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        useCount: number;
        category: import(".prisma/client").$Enums.HashtagCategory;
        isBanned: boolean;
        isFeatured: boolean;
    }[]>;
    search(q: string): Promise<{
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        useCount: number;
        category: import(".prisma/client").$Enums.HashtagCategory;
        isBanned: boolean;
        isFeatured: boolean;
    }[]>;
}
