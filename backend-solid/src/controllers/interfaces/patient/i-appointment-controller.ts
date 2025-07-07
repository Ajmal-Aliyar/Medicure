import { Request, Response } from "express";

export interface IPatientAppointmentController {
    getAppointmentsByPatientId(
    req: Request,
    res: Response
  ): Promise<void>
}