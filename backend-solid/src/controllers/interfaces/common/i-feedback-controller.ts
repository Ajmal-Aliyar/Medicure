import { Request, Response } from "express";

export interface IFeedbackController {
    getFeedbackByAppointmentId(req: Request, res: Response): Promise<void>
    getFeedbacksByDoctorId(
    req: Request,
    res: Response
  ): Promise<void>
}