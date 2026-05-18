import { Comment, Post } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class FeedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly authorSelect;
    private readonly commentAuthorSelect;
    createPost(authorId: string, dto: CreatePostDto): Promise<Post>;
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
    getPost(postId: string): Promise<Post>;
    getChefPosts(authorId: string, page?: number, limit?: number): Promise<({
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
    deletePost(postId: string, userId: string): Promise<void>;
    likePost(postId: string): Promise<{
        likeCount: number;
    }>;
    unlikePost(postId: string): Promise<{
        likeCount: number;
    }>;
    addComment(postId: string, authorId: string, text: string): Promise<Comment>;
    getComments(postId: string, page?: number, limit?: number): Promise<({
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
    deleteComment(commentId: string, userId: string): Promise<void>;
    getByHashtag(hashtag: string, page?: number, limit?: number): Promise<({
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
    getTrendingPosts(limit?: number): Promise<({
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
}
