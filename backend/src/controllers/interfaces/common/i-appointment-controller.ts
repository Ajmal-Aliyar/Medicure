import { Request, Response } from "express";

export interface IAppointmentController {
    getAppointmentsCardDetails(
    req: Request,
    res: Response
  ): Promise<void>;
  getAppointmentByRoomId(req: Request, res: Response): Promise<void>;
  getAppointmentById( req: Request, res: Response ): Promise<void>;
}