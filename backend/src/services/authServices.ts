import { UserRepository } from '../repositories/userRepository';
import { setRedisData, getRedisData, deleteRedisData, incRedisData, expRedisData } from '../utils/redisUtil';
import { hashPassword, verifyPassword } from '../utils/passwordUtil';
import { sendOtpToEmail } from '../utils/otpUtil';
import { checkBruteForce, deleteBruteForce } from '../utils/BruteForceHandler';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../utils/jwtUtil';

const OTP_EXPIRATION = 60;

interface authorizedUserResponse {
    accessToken: string;
    refreshToken: string;
}
export class AuthService {

    async signUp(fullname: string, email: string, number: number, password: string) {
        try {
            const existingUser = await UserRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            const otp = await sendOtpToEmail(email)
            if (otp) {
                await setRedisData(`otp-${email}`, otp.toString(), OTP_EXPIRATION);
                const hashedPassword = await hashPassword(password);
                await setRedisData(`${email}`, JSON.stringify({ fullname, email, number, hashedPassword }), 600);
                return 'Please check your inbox and verify your email address to complete the registration process'
            } else {
                throw new Error('OTP not sent');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            throw new Error(`Signup failed: ${error.message}`);
        }
    }

    async signIn(email: string, password: string): Promise<authorizedUserResponse> {
        try {
            await checkBruteForce(email, 3)
            const User = await UserRepository.findByEmail(email)
            if(!User) {
                throw new Error(`Email or Password is wrong`)
            }
            const isMatch = await verifyPassword( password, User.password)
            if (!isMatch) {
                throw new Error('Password is wrong');
            }
            await deleteBruteForce(email)
            const payload = { email, role: 'user' };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            return { accessToken, refreshToken };

        } catch (error: any) {
            console.error('Error during signin:', error);
            throw new Error(`Signin failed: ${error.message}`);
        }
    }
    
    async resendOTP(email: string) {
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

    async verifyOTP(email: string, otp: string): Promise<authorizedUserResponse> {
        try {
            await checkBruteForce(email, 30)
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
            const user = await UserRepository.createUser(userData.fullname, userData.email, userData.number, userData.hashedPassword);
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
