import { Request, Response } from "express";
import { IAdminServices } from "../services/interfaces/IAdminServices";




export class AdminController {
    private adminServices;

    constructor(adminServices: IAdminServices) {
        this.adminServices = adminServices
        this.signIn = this.signIn.bind(this)
    }

     async signIn(req: Request, res: Response) {
        console.log(req.body,'bd')
            const { email, password, role } = req.body
            try {
                const { accessToken, refreshToken, _id } = await this.adminServices.signIn(email, password, role)
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
                res.status(200).json({message: 'Sign in successfully.', _id});
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
        }
}