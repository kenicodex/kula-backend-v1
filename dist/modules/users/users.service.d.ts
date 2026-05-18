import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    update(id: string, data: UpdateProfileDto): Promise<User>;
    findAll(where?: Prisma.UserWhereInput): Promise<{
        name: string;
        phone: string | null;
        avatar: string | null;
        fcmToken: string | null;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
