import { HTTP_STATUS } from "@/constants";
import { TYPES } from "@/di/types";
import { IFeedbackService } from "@/services";
import { successResponse } from "@/utils";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class FeedbackController {
    constructor(@inject(TYPES.FeedbackService) private readonly feedbackService: IFeedbackService) {}


  getFeedbackByAppointmentId = async (req: Request, res: Response): Promise<void> => {
    const {appointmentId} = req.params;
    const appointment = await this.feedbackService.getFeedbackByAppointmentId(appointmentId)
    successResponse(res, HTTP_STATUS.OK, "Feedback fetched successfully", appointment );
  }
}