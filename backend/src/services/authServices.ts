import { UserRepository } from '../repositories/userRepository';
import { DoctorRepository } from '../repositories/doctorRepository';
import { setRedisData, getRedisData, deleteRedisData } from '../utils/redisUtil';
import { hashPassword, verifyPassword } from '../utils/passwordUtil';
import { sendOtpToEmail } from '../utils/otpUtil';
import { checkBruteForce, deleteBruteForce } from '../utils/BruteForceHandler';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtil';

const OTP_EXPIRATION = 60;

interface authorizedUserResponse {
    accessToken: string;
    refreshToken: string;
}
export class AuthService {

    async signUp(fullname: string, email: string, number: number, password: string, role: string) {
        try {
            console.log(role, 'role');
            const repository = role === 'doctor' ? DoctorRepository : UserRepository;
            const existingAccount = await repository.findByEmail(email);
            if (existingAccount) {
                throw new Error(`${role} already exists`);
            }
            const otp = await sendOtpToEmail(email);
            if (!otp) {
                throw new Error('OTP not sent');
            }
            await setRedisData(`otp-${email}`, otp.toString(), OTP_EXPIRATION);
            const hashedPassword = await hashPassword(password);
            await setRedisData(
                `${email}`,
                JSON.stringify({ fullname, email, number, hashedPassword, role }),
                600
            );
            return 'Please check your inbox and verify your email address to complete the registration process';
    
        } catch (error) {
            console.error('Error during signup:', error);
            throw new Error(`Signup failed: ${error.message}`);
        }
    }
    
    async signIn(email: string, password: string, role: string): Promise<authorizedUserResponse> {
        try {
            await checkBruteForce(email,5,600)
            const repository = role === 'doctor' ? DoctorRepository : UserRepository;
            const user = await repository.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }
            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }
            await deleteBruteForce(email);
            const payload = { email, role };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error during sign-in:', error);
            throw new Error(`Sign-in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    

    async changePassword (email: string, password: string, role:string):Promise<boolean> {
        const hashedPassword = await hashPassword(password);
        const repository = role === 'doctor' ? DoctorRepository : UserRepository;
        const result = await repository.changePassword(email, hashedPassword)
        if (result.modifiedCount === 0) {
            throw new Error('No user found with this email.');
        }
        console.log('Password updated successfully');
        return true
    }

    async sendOTP(email: string) {
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

    async verifyOTPAndRegister(email: string, otp: string): Promise<authorizedUserResponse> {
        try {
            await checkBruteForce(email, 30,1800)
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
            if (userData.role === 'doctor') {
                const doctor = await DoctorRepository.createDoctor(userData.fullname, userData.email, userData.number, userData.hashedPassword);
                if (!doctor) {
                    throw new Error('Registration failed: We encountered an issue while creating your account.');
                }
            } else {
                const user = await UserRepository.createUser(userData.fullname, userData.email, userData.number, userData.hashedPassword);
                if (!user) {
                    throw new Error('Registration failed: We encountered an issue while creating your account.');
                }
            }

            const payload = { email, role: userData.role };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            return { accessToken, refreshToken };
        } catch (error: any) {
            console.error('Error verifying OTP:', error.message);
            throw new Error(error.message);
        }
    }

    async verifyOTP(email: string, otp: string): Promise<boolean> {
        await checkBruteForce(email, 30,1800)
        const validOtp = await getRedisData(`otp-${email}`);
        if (!validOtp) {
            throw new Error('The OTP has either expired or is invalid. Please request a new one.');
        }
        if (validOtp !== otp) {
            throw new Error('The OTP you entered is incorrect. Please try again.');
        }
        await deleteRedisData(`otp-${email}`);
        await deleteBruteForce(email)
        return true
    }

}
