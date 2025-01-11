import { Request, Response } from 'express';
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export class AuthController {
    async signup(req: Request, res: Response) {
        const { name, email, mobile, password } = req.body;
        try {
            const message = await authService.signup(name, email, mobile, password);
            console.log('success', message)
            res.status(201).json({ message })
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    
    async resendOTP(req: Request, res: Response) {
        const { email } = req.body;
        try {
            console.log(email, 'email')
            const isSended = await authService.resendOTP(email);
            res.status(200).json({ message: 'OTP sended successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        const { email, otp } = req.body;
        console.log('Received OTP request:', req.body);
        try {
            const { accessToken, refreshToken } = await authService.verifyOtp(email, otp);
            if (accessToken) {
                res.cookie('accessToken', accessToken, {
                    httpOnly: false, 
                    maxAge: 15 * 60 * 1000, 
                    secure: process.env.NODE_ENV === 'production', 
                });
            }
            if (refreshToken) {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, 
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production', 
                });
            }
            res.status(200).json({
                message: 'OTP verified successfully. Tokens issued.',
            });
        } catch (error: any) {
            console.error('Error verifying OTP:', error.message);
            res.status(400).json({
                error: error.message || 'An unexpected error occurred. Please try again later.',
            });
        }
    }
    
}
