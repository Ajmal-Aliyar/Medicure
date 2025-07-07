import { inject, injectable } from "inversify";
import { IPatientAppointmentController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IAppointmentService, IPatientAppointmentService } from "@/services";
import { Request, Response } from "express";
import {
  buildPaginationMeta,
  getPaginationParams,
  successResponse,
} from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { filterAppointmentQuerySchema } from "@/validators/appointment-validator";

@injectable()
export class PatientAppointmentController
  implements IPatientAppointmentController
{
  constructor(
    @inject(TYPES.AppointmentService)
    private readonly appointmentService: IAppointmentService
  ) {}

  getAppointmentsByPatientId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id, role } = req.user;
    const pagination = getPaginationParams(req);
    const parsedQuery = filterAppointmentQuerySchema.parse(req.query)
    const { appointments, total } =
      await this.appointmentService.getAppointmentsCardDetails(
        id,
        role,
        parsedQuery,
        pagination
      );
    const meta = buildPaginationMeta(total, pagination.limit);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Patient Appointments details fetched successfully.",
      appointments,
      meta
    );
  };
}
