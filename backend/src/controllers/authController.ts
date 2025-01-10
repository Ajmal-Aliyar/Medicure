import { Request, Response } from 'express';
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export class AuthController {
    async signup(req: Request, res: Response) {
        const { name, email, mobile, password } = req.body;
        try {
            const message = await authService.signup(name, email, mobile, password);
            console.log('success',message)
            res.status(201).json({message})
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async sendOtp(req: Request, res: Response ) {
        const { email } = req.body;
        try {
            console.log(email,'email')
            const isSended = await authService.sendOtpToEmail(email);
            if (isSended) {
                res.status(200).json({ message: 'OTP sended successfully' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        const { email, otp } = req.body;
        console.log(req.body)
        try {
            const isVerified = await authService.verifyOtp(email, otp);
            if (isVerified) {
                res.status(200).json({ message: 'OTP verified successfully' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
