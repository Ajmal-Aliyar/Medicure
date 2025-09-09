import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IDoctorScheduleService } from "@/services";
import { TYPES } from "@/di/types";
import { successResponse } from "@/utils";
import { IDoctorScheduleController } from "../interfaces";
import { SCHEDULE_MESSAGES, HTTP_STATUS } from "@/constants";

@injectable()
export class DoctorScheduleController implements IDoctorScheduleController {
  constructor(
    @inject(TYPES.DoctorScheduleService)
    private _scheduleService: IDoctorScheduleService
  ) {}

  getSchedule = async (req: Request, res: Response): Promise<void> => {
    const doctorId = req.user?.id as string; 
    const schedule = await this._scheduleService.getSchedule(doctorId);
    successResponse(res, HTTP_STATUS.OK, SCHEDULE_MESSAGES.SCHEDULE_FETCHED, schedule);
  };

  updateSchedule = async (req: Request, res: Response): Promise<void> => {
    const doctorId = req.user?.id as string;
    const { schedule, message } = await this._scheduleService.upsertSchedule(doctorId, req.body);
    successResponse(res, HTTP_STATUS.OK, message, schedule);
  };
}
