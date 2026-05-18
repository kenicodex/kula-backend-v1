import { FeedService } from './feed.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeed(page?: number, limit?: number): Promise<{
        data: ({
            media: {
                id: string;
                postId: string;
                sortOrder: number;
                url: string;
            }[];
            hashtags: ({
                hashtag: {
                    name: string;
                    id: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    useCount: number;
                    category: import(".prisma/client").$Enums.HashtagCategory;
                    isBanned: boolean;
                    isFeatured: boolean;
                };
            } & {
                postId: string;
                hashtagId: string;
            })[];
            author: {
                name: string;
                avatar: string | null;
                id: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.PostType;
            caption: string | null;
            dailySpecialPrice: number | null;
            dailySpecialExpiresAt: Date | null;
            likeCount: number;
            commentCount: number;
            authorId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getTrending(limit?: number): Promise<({
        media: {
            id: string;
            postId: string;
            sortOrder: number;
            url: string;
        }[];
        hashtags: ({
            hashtag: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                useCount: number;
                category: import(".prisma/client").$Enums.HashtagCategory;
                isBanned: boolean;
                isFeatured: boolean;
            };
        } & {
            postId: string;
            hashtagId: string;
        })[];
        author: {
            name: string;
            avatar: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.PostType;
        caption: string | null;
        dailySpecialPrice: number | null;
        dailySpecialExpiresAt: Date | null;
        likeCount: number;
        commentCount: number;
        authorId: string;
    })[]>;
    getByHashtag(tag: string, page?: number, limit?: number): Promise<({
        media: {
            id: string;
            postId: string;
            sortOrder: number;
            url: string;
        }[];
        hashtags: ({
            hashtag: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                useCount: number;
                category: import(".prisma/client").$Enums.HashtagCategory;
                isBanned: boolean;
                isFeatured: boolean;
            };
        } & {
            postId: string;
            hashtagId: string;
        })[];
        author: {
            name: string;
            avatar: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.PostType;
        caption: string | null;
        dailySpecialPrice: number | null;
        dailySpecialExpiresAt: Date | null;
        likeCount: number;
        commentCount: number;
        authorId: string;
    })[]>;
    getChefPosts(userId: string, page?: number, limit?: number): Promise<({
        media: {
            id: string;
            postId: string;
            sortOrder: number;
            url: string;
        }[];
        hashtags: ({
            hashtag: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                useCount: number;
                category: import(".prisma/client").$Enums.HashtagCategory;
                isBanned: boolean;
                isFeatured: boolean;
            };
        } & {
            postId: string;
            hashtagId: string;
        })[];
        author: {
            name: string;
            avatar: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.PostType;
        caption: string | null;
        dailySpecialPrice: number | null;
        dailySpecialExpiresAt: Date | null;
        likeCount: number;
        commentCount: number;
        authorId: string;
    })[]>;
    getComments(id: string, page?: number, limit?: number): Promise<({
        author: {
            name: string;
            avatar: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        text: string;
        isFlagged: boolean;
        flagReason: string | null;
        postId: string;
    })[]>;
    getPost(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.PostType;
        caption: string | null;
        dailySpecialPrice: number | null;
        dailySpecialExpiresAt: Date | null;
        likeCount: number;
        commentCount: number;
        authorId: string;
    }>;
    createPost(user: any, dto: CreatePostDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.PostType;
        caption: string | null;
        dailySpecialPrice: number | null;
        dailySpecialExpiresAt: Date | null;
        likeCount: number;
        commentCount: number;
        authorId: string;
    }>;
    like(id: string): Promise<{
        likeCount: number;
    }>;
    unlike(id: string): Promise<{
        likeCount: number;
    }>;
    addComment(id: string, user: any, body: {
        text: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        text: string;
        isFlagged: boolean;
        flagReason: string | null;
        postId: string;
    }>;
    deleteComment(commentId: string, user: any): Promise<void>;
    deletePost(id: string, user: any): Promise<void>;
}
