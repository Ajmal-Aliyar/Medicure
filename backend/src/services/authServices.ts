import { UserRepository } from '../repositories/userRepository';
import { setRedisData, getRedisData, deleteRedisData } from '../utils/redisUtils';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenUtils';

const userRepository = new UserRepository();

export class AuthService {

    async signup(fullname: string, email: string, number: number, password: string) {
        try {
            const existingUser = await userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            console.log('hello')

            const otp = await this.sendOtpToEmail(email);
            if (otp) {
                const userData = { fullname, email, number, password };
                await setRedisData(`${email}`, userData, 300);
                return { message: 'Please verify your email to complete registration. OTP has been sent successfully.' };
            } else {
                throw new Error('OTP not sent');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            throw new Error(`Signup failed: ${error.message}`);
        }
    }
    


    async sendOtpToEmail(email: string) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Your OTP for Signup',
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        };
        await transporter.sendMail(mailOptions)
            .then(() => console.log('OTP sent successfully'))
            .catch((error) => {
                console.error('Error sending email:', error);
            });
        return otp
    }


    async verifyOtp(email: string, otp: number): Promise<boolean> {
        const storedOtp = await getRedisData(`otp:${email}`);

        if (storedOtp === null) {
            throw new Error('OTP expired or invalid');
        }

        if (storedOtp !== otp.toString()) {
            throw new Error('Invalid OTP');
        }

        await deleteRedisData(`otp:${email}`);
        return true;
    }
}
