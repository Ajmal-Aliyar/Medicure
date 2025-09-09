import { inject, injectable } from "inversify";
import { IAppointmentController } from "../interfaces";
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
export class AppointmentController
  implements IAppointmentController
{
  constructor(
    @inject(TYPES.AppointmentService)
    private readonly _appointmentService: IAppointmentService
  ) {}

  getAppointmentsCardDetails = async (
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

  getAppointmentByRoomId = async(req: Request, res: Response): Promise<void> => {
    const { id, role } = req.user;
    const roomId = req.params.roomId as string;
    const appointment = await this._appointmentService.getAppointmentByRoomId(
        id,
        role,
        roomId
      );
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Appointment details fetched successfully.",
      appointment
    );
  }

   getAppointmentById = async( req: Request, res: Response ): Promise<void> => {
    const { id, role } = req.user;
    const {appointmentId} = req.params
    console.log('appointmentId:', appointmentId);
    
    const appointmentDetails = await this._appointmentService.getAppointmentById(id, role, appointmentId)
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Appointment details fetched successfully.",
      appointmentDetails
    );
   }
}
