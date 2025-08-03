import { inject, injectable } from "inversify";
import { IDoctorAppointmentController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IDoctorAppointmentService } from "@/services";
import { Request, Response } from "express";
import {
  successResponse,
} from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class DoctorAppointmentController
  implements IDoctorAppointmentController
{
  constructor(
    @inject(TYPES.DoctorAppointmentService)
    private readonly doctorAppointmentService: IDoctorAppointmentService
  ) {}

  markAppointmentCompleted = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    console.log('inside router');
    
    const { id } = req.user;
    const roomId = req.params.roomId
      await this.doctorAppointmentService.markAppointmentCompleted( roomId, id);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Mark appointment as completed successfully.");
  };
}
