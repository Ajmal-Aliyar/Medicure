import { Request, Response } from "express";

export interface IAdminWithdrawRequestController {
    getWithdrawRequests(req: Request, res: Response): Promise<void>
}