import { NextFunction, Request, Response } from "express";

export interface ISlotController {
    getSlots(req: Request, res: Response, next: NextFunction): Promise<void>;
    manageSlots(req: Request, res: Response): Promise<void>;
}