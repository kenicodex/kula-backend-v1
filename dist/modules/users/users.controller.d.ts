import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        name: string;
        phone: string | null;
        avatar: string | null;
        fcmToken: string | null;
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, body: any): Promise<{
        name: string;
        phone: string | null;
        avatar: string | null;
        fcmToken: string | null;
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
