import { Request, Response } from "express";

export interface IDoctorPrescriptionController {
    createPrescription(req: Request, res: Response): Promise<void> 
    updatePrescription(req: Request, res: Response): Promise<void> 
}