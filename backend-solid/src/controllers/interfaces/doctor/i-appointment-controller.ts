import { Request, Response } from "express";

export interface IDoctorAppointmentController {
    markAppointmentCompleted(
    req: Request,
    res: Response
  ): Promise<void>
}