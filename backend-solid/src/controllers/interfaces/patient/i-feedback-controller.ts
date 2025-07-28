import { Request, Response } from "express";

export interface IPatientFeedbackController {
    submitFeedback(req: Request, res: Response): Promise<void>
    getFeedbacksByPatientId(req: Request, res: Response): Promise<void>
}