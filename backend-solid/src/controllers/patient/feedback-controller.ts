import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IPatientFeedbackController } from "../interfaces";
import { IPatientFeedbackService } from "@/services";

@injectable()
export class PatientFeedbackController implements IPatientFeedbackController {
  constructor(
    @inject(TYPES.PatientFeedbackService)
    private readonly patientFeedbackService: IPatientFeedbackService,
  ) {}

  submitFeedback = async (req: Request, res: Response): Promise<void> => {
    const { id: patientId } = req.user;
    const { appointmentId } = req.params;
    const { rating, comment } = req.body;

    await this.patientFeedbackService.submitFeedback(appointmentId, patientId, { rating, comment });
    successResponse(res, HTTP_STATUS.CREATED, "Feedback submitted successfully");
  };

}
