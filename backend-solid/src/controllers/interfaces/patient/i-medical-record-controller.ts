import { Request, Response } from "express"
export interface IPatientMedicalRecordController {
    uploadMedicalRecord(req: Request, res: Response):Promise<void>;
    getMedicalRecords(req: Request, res: Response): Promise<void>;
}