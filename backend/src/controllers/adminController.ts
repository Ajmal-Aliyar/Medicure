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
        this.getAllPatients = this.getAllPatients.bind(this)
        this.block = this.block.bind(this)
        this.unblock = this.unblock.bind(this)
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
        } catch (error: unknown) {
            next(error)
        }
    }

    async getDoctorDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            const DoctorData = await this.adminServices.getDoctorDetails(_id)
            res.status(200).json({data: DoctorData}) 
        } catch (error: unknown) {
            next(error)
        }
    }

    async getApprovedDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const searchQuery: string = (req.query.searchQuery as string) || "";
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 5;

            const approvedDoctors = await this.adminServices.getApprovedDoctors(skip, limit, searchQuery);

            res.status(200).json({
                success: true,
                data: approvedDoctors.data,
                total: approvedDoctors.total
            });
        } catch (error: unknown) {
            console.error('Error fetching approved doctors:', error);
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
        } catch (error: unknown) {
            console.error('Error fetching approved doctors:', error);
            next(error);
        }
    }

    async getDoctorAppointmentDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            const DoctorSlots = await this.adminServices.getDoctorAppointmentDetails(_id)
            res.status(200).json({data: DoctorSlots}) 
        } catch (error: unknown) {
            next(error)
        }
    }

    async approveDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            await this.adminServices.approveDoctor(_id)
            res.status(200).json({message: 'Approved doctor successfully.'}) 
        } catch( error: unknown) {
            next(error)
        }
    }

    async  rejectDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.params
            await this.adminServices.rejectDoctor(_id)
            res.status(200).json({message: 'Rejected doctor successfully.'}) 
        } catch( error: unknown) {
            next(error)
        }
    }

    async getAllPatients(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 5;
            const patientsData = await this.adminServices.getAllPatients(skip, limit);

            res.status(200).json({
                success: true,
                data: patientsData.data,
                total: patientsData.total
            });
        } catch (error: unknown) {
            console.error('Error fetching approved doctors:', error);
            next(error);
        }
    }

    async block(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.query._id as string
            const role = req.query.role as string
            await this.adminServices.block( _id, role)
            res.status(200).json({message: `Blocked ${role} successfully`}) 
        } catch( error: unknown) {
            next(error)
        }
    }

    async unblock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req.query._id as string
            const role = req.query.role as string
            await this.adminServices.unblock( _id, role)
            res.status(200).json({message: `Unblocked ${role} successfully`}) 
        } catch( error: unknown) {
            next(error)
        }
    }

}