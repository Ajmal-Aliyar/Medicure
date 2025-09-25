import { AuthResponseDTO, LoginDto, RegisterDto } from "@/dtos/auth-dtos";
import { IAuthResponseUser, IRole } from "@/interfaces";

export interface IAuthService {
register(data: RegisterDto): Promise<void>;
    login(data: LoginDto): Promise<AuthResponseDTO>;
    logout(userId: string): Promise<void>;
    resendOtp(email: string): Promise<void>;
    refreshToken(token: string): Promise<AuthResponseDTO>;
    verifyOtpAndRegister(email: string, otp: string): Promise<AuthResponseDTO>;
    me(userId: string, role: IRole ): Promise<IAuthResponseUser>
}