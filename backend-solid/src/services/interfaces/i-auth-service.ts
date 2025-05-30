import { AuthResponse, LoginDto, RegisterDto } from "@/dtos/auth-dtos";
import { IAuthResponseUser, IRole } from "@/interfaces";

export interface IAuthService {
    register(data: RegisterDto): Promise<void>;
    login(data: LoginDto): Promise<AuthResponse>;
    logout(userId: string): Promise<void>;
    refreshToken(token: string): Promise<AuthResponse>;
    verifyOtpAndRegister(email: string, otp: string): Promise<AuthResponse>;
    me(userId: string, role: IRole ): Promise<IAuthResponseUser>
}