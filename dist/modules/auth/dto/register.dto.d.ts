export declare enum UserRole {
    CLIENT = "client",
    CHEF = "chef",
    CREATOR = "creator"
}
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
}
