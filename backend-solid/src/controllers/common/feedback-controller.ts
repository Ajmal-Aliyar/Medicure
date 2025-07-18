import { HTTP_STATUS } from "@/constants";
import { TYPES } from "@/di/types";
import { IFeedbackService } from "@/services";
import {
  buildPaginationMeta,
  getPaginationParams,
  successResponse,
} from "@/utils";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class FeedbackController {
  constructor(
    @inject(TYPES.FeedbackService)
    private readonly feedbackService: IFeedbackService
  ) {}

  getFeedbackByAppointmentId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { appointmentId } = req.params;
    const appointment = await this.feedbackService.getFeedbackByAppointmentId(
      appointmentId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Feedback fetched successfully",
      appointment
    );
  };

  getFeedbacksByDoctorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { doctorId } = req.params;
    console.log(doctorId);
    
    const pagination = getPaginationParams(req);
    const { data, total } = await this.feedbackService.getFeedbacksByDoctorId(
      doctorId,
      pagination
    );
    const meta = buildPaginationMeta(total, pagination.skip);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Feedback details fetched successfully.",
      data,
      meta
    );
  };
}
