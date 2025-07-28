import { Request, Response } from "express";

export interface IPatientDoctorController {
    getPublicDetails(
      req: Request,
      res: Response
    ): Promise<void>
}