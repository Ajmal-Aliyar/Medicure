import { Request, Response } from "express";
export interface IConnectionRequestController {
    createConnectionRequest(req: Request, res: Response): Promise<void>;
    approveRequest(req: Request, res: Response): Promise<void>;
    getConnectionRequests(req: Request, res: Response): Promise<void>;
}