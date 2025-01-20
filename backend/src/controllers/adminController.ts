import { NextFunction, Request, Response } from "express";
import { IAdminServices } from "../services/interfaces/IAdminServices";




export class AdminController {
    private adminServices: IAdminServices;

    constructor(adminServices: IAdminServices) {
        this.adminServices = adminServices
        this.signIn = this.signIn.bind(this)
        this.getDoctorDetails = this.getDoctorDetails.bind(this)
        this.getApprovedDoctors = this.getApprovedDoctors.bind(this)
        this.getDoctorApprovalRequests = this.getDoctorApprovalRequests.bind(this)
        this.getDoctorAppointmentDetails = this.getDoctorAppointmentDetails.bind(this)
        this.approveDoctor = this.approveDoctor.bind(this)
    }

    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body, 'bd')
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
            res.status(200).json({ message: 'Sign in successfully.', _id });
        } catch (error: any) {
            next(error)
        }
    }

    async getDoctorDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            const DoctorData = await this.adminServices.getDoctorDetails(_id)
            res.status(200).json({data: DoctorData}) 
        } catch (error: any) {
            next(error)
        }
    }

    async getApprovedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 5;
            const approvedDoctors = await this.adminServices.getApprovedDoctors(skip, limit);

            res.status(200).json({
                success: true,
                data: approvedDoctors.data,
                hasMore: approvedDoctors.hasMore
            });
        } catch (error: any) {
            console.error('Error fetching approved doctors:', error.message);
            next(error);
        }
    }

    async getDoctorApprovalRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 5;
            const approvedDoctors = await this.adminServices.getDoctorApprovalRequests(skip, limit);

            res.status(200).json({
                success: true,
                data: approvedDoctors.data,
                hasMore: approvedDoctors.hasMore
            });
        } catch (error: any) {
            console.error('Error fetching approved doctors:', error.message);
            next(error);
        }
    }

    async getDoctorAppointmentDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            const DoctorSlots = await this.adminServices.getDoctorAppointmentDetails(_id)
            res.status(200).json({data: DoctorSlots}) 
        } catch (error: any) {
            next(error)
        }
    }

    async approveDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            await this.adminServices.approveDoctor(_id)
            res.status(200).json({message: 'Approved doctor successfully.'}) 
        } catch( error: any) {
            next(error)
        }
    }

    async  rejectDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            await this.adminServices.rejectDoctor(_id)
            res.status(200).json({message: 'Rejected doctor successfully.'}) 
        } catch( error: any) {
            next(error)
        }
    }
}