import { Hashtag } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HashtagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOrCreate(name: string): Promise<Hashtag>;
    incrementUseCount(names: string[]): Promise<void>;
    trending(limit?: number): Promise<Hashtag[]>;
    search(query: string): Promise<Hashtag[]>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            useCount: number;
            category: import(".prisma/client").$Enums.HashtagCategory;
            isBanned: boolean;
            isFeatured: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    banHashtag(id: string): Promise<Hashtag>;
    featureHashtag(id: string, featured: boolean): Promise<Hashtag>;
}
