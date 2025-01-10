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

            const isSended = await this.sendOtpToEmail(email);
            if (isSended) {
                const hashedPassword = await this.hashPassword(password)
                await setRedisData(`${email}`, JSON.stringify({ fullname, email, number, hashedPassword }), 600);
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
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
        await setRedisData(`otp-${email}`, JSON.stringify(otp), 60);
        const sendedOtp = await getRedisData(`otp-${email}`)
        console.log(sendedOtp)
        return true
    }


    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const userData = JSON.parse(await getRedisData(email))
        const validOtp = await getRedisData(`otp-${email}`)
        console.log(userData,validOtp,'user')

        if (validOtp === null) {
            throw new Error('OTP expired resend OTP');
        }
        if (validOtp !== otp) {
            throw new Error('Invalid OTP');
        }
        await deleteRedisData(`otp:${email}`);
        
        const user = await userRepository.createUser(userData.fullname, userData.email, userData.number, userData.hashedPassword)
        console.log(user,'is')
        return true;
    }

    async hashPassword (password: string): Promise<string> {
        const saltRounds = 12; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };
}
