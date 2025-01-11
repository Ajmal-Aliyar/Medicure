import { UserRepository } from '../repositories/userRepository';
import { setRedisData, getRedisData, deleteRedisData, incRedisData, expRedisData } from '../utils/redisUtil';
import { hashPassword } from '../utils/passwordUtil';
import { sendOtpToEmail } from '../utils/otpUtil';
import { checkBruteForce, deleteBruteForce } from '../utils/BruteForceHandler';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtil';
const userRepository = new UserRepository();

const OTP_EXPIRATION = 60;

interface OTPServiceResponse {
    accessToken: string;
    refreshToken: string;
}
export class AuthService {
    
    async signup(fullname: string, email: string, number: number, password: string) {
        try {
            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            const otp = await sendOtpToEmail(email)
            if (otp) {
                await setRedisData(`otp-${email}`, otp.toString(), OTP_EXPIRATION);
                const hashedPassword = await hashPassword(password);
                await setRedisData(`${email}`, JSON.stringify({ fullname, email, number, hashedPassword }), 600);
                return  'Please check your inbox and verify your email address to complete the registration process' 
            } else {
                throw new Error('OTP not sent');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            throw new Error(`Signup failed: ${error.message}`);
        }
    }

    async resendOTP (email: string) {
        try {
           
            const otp = await sendOtpToEmail(email)
            if (otp) {
                await setRedisData(`otp-${email}`, otp.toString(), OTP_EXPIRATION);
            } else {
                throw new Error('OTP not sent');
            }
        } catch (error: any) {
            console.error('Error during resend otp :', error);
            throw new Error(`Resend otp failed: ${error.message}`);
        }
    }
    
    async verifyOtp(email: string, otp: string): Promise<OTPServiceResponse> {
        try {
            await checkBruteForce(email)
            const validOtp = await getRedisData(`otp-${email}`);
            if (!validOtp) {
                throw new Error('The OTP has either expired or is invalid. Please request a new one.');
            }
            if (validOtp !== otp) {
                throw new Error('The OTP you entered is incorrect. Please try again.');
            }
            await deleteRedisData(`otp-${email}`);
            await deleteBruteForce(email)
            const userData = JSON.parse(await getRedisData(email));
            const user = await userRepository.createUser(userData.fullname, userData.email, userData.number, userData.hashedPassword);
            if (!user) {
                throw new Error('Registration failed: We encountered an issue while creating your account.');
            }

            const payload = { email, role: 'user' };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            return { accessToken, refreshToken };
        } catch (error: any) {
            console.error('Error verifying OTP:', error.message);
            throw new Error(error.message);
        }
    }
    
}
