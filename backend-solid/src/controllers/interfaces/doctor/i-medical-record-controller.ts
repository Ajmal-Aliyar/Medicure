import { Request, Response } from "express";

export interface IDoctorMedicalRecordController {
    getPatientMedicalRecordsByAppointmentId(req: Request, res: Response): Promise<void>;
}