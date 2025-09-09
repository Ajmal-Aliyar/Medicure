import { Request, Response } from "express";

export interface IDoctorWithdrawRequestController {
    getWithdrawRequests(req: Request, res: Response): Promise<void>;
    cancelWidthdrawRequest(req: Request, res: Response): Promise<void> ;
}