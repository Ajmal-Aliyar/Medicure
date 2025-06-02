export interface IOtpService {
    generateOtp(): string;
    generateOtpToken(email: string, otp: string): string;
    storeOtp(email: string, otp: string, ttl?: number): Promise<void>;
    verifyOtp(email: string, inputOtp: string): Promise<boolean>;
    deleteOtp(email: string): Promise<void>;
}