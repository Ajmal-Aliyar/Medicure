import { inject, injectable } from "inversify";
import { IPatientAppointmentController } from "../interfaces";
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
export class PatientAppointmentController
  implements IPatientAppointmentController
{
  constructor(
    @inject(TYPES.AppointmentService)
    private readonly _appointmentService: IAppointmentService
  ) {}

  getAppointmentsByPatientId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id, role } = req.user;
    const pagination = getPaginationParams(req);
    const parsedQuery = filterAppointmentQuerySchema.parse(req.query)
    const { appointments, total } =
      await this._appointmentService.getAppointmentsCardDetails(
        id,
        role,
        parsedQuery,
        pagination
      );
    const meta = buildPaginationMeta(total, pagination.skip);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Appointments details fetched successfully.",
      appointments,
      meta
    );
  };
}
