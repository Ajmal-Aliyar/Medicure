import { Request, Response } from "express";

export interface IAdminWithdrawRequestController {
    getWithdrawRequests(req: Request, res: Response): Promise<void>;
    rejectWidthdrawRequest(req: Request, res: Response): Promise<void>;
    approveWithdrawRequest(req: Request, res: Response): Promise<void>
}