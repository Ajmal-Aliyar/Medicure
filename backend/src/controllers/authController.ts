import { NextFunction, Request, Response } from 'express';
import { AuthService } from "../services/implementations/authServices";

const authService = new AuthService();

export class AuthController {

    async checkRequest (req: Request, res: Response, next: NextFunction) {
        try {
            console.log('success', req.body)
            res.status(201)
        } catch (error: unknown) {
            next(error)
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction ) {
        const { name, email, mobile, password, role } = req.body;
        try {
            const message = await authService.signUp(name, email, mobile, password, role);
            console.log('success', message)
            res.status(201).json({ message })
        } catch (error: unknown) {
            next(error)
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction ) {
        const { email, password, role } = req.body
        try {
            console.log('signing in');
            
            const { accessToken, refreshToken, _id } = await authService.signIn(email, password, role)
            console.log('hello')
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
            res.status(200).json({_id});
        } catch (error: unknown) {
            next(error)
        }
    }

    async googleAuth (req: Request, res: Response, next: NextFunction ) {
        const { email, profileImage, fullName } = req.body
        try {
            const { accessToken, refreshToken, _id } = await authService.googleAuth({ fullName, email, profileImage, })
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
            res.status(200).json({_id});
        } catch (error: unknown) {
            next(error)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction ) {
        try {
            const { email, password, role } = req.body
            if (!email || !password ) {
                res.status(400).json({ error: 'Email and password are required.' });
            }
            const status = await authService.changePassword(email, password, role)
            if (status) {
                res.status(200).json({ message: 'Password changed successfully.' });
            } else {
                res.status(404).json({ error: 'User not found or unable to change password.' });
            }
        } catch (error: unknown) {
            next(error)
        }
    }

    async userInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id, role } = req.client
            const userData = await authService.userInfo(_id,role)
            console.log(userData, 'cli')
            const responseData = {...userData}
            res.status(200).json(responseData)
        } catch (error) {
            next(error)
        }
    }


    async sendOTP(req: Request, res: Response, next: NextFunction ) {
        const { email } = req.body;
        try {
            console.log(email, 'email')
            await authService.sendOTP(email);
            res.status(200).json({ message: 'OTP sended successfully' });
        } catch (error: unknown) {
            next(error)
        }
    }

    async verifyOTPAndRegister(req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Received OTP request:', req.body);
            const { email, otp } = req.body;
            const { accessToken, refreshToken } = await authService.verifyOTPAndRegister(email, otp);
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
        } catch (error: unknown) {
            next(error)
        }
    }

    async verifyOTP(req: Request, res: Response, next: NextFunction ) {
        try {
            console.log('Received OTP request:', req.body);
            const { email, otp } = req.body;
            const message = await authService.verifyOTP(email, otp)
            if (message) {
                res.status(200).json({
                    message: 'OTP verified successfully. Change password',
                });
            }

        } catch (error: unknown) {
            next(error)
        }
    }

}
