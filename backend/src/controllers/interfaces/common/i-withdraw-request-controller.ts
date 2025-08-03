import { Request, Response } from "express";

export interface IWithdrawRequestController {
    createWithdrawRequest(req: Request, res: Response): Promise<void>
}