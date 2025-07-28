import { inject, injectable } from "inversify";
import { IAdminAppointmentController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IAppointmentService } from "@/services";
import { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  successResponse,
} from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { filterAppointmentQuerySchema } from "@/validators/appointment-validator";

@injectable()
export class AdminAppointmentController
  implements IAdminAppointmentController
{
  constructor(
    @inject(TYPES.AppointmentService)
    private readonly appointmentService: IAppointmentService
  ) {}

  
}
