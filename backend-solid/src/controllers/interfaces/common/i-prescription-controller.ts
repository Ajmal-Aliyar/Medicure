import { Request, Response } from "express";

export interface IPrescriptionController {
    getPrescription (req: Request, res: Response): Promise<void>;
    viewPrescription (req: Request, res: Response): Promise<void>;
}