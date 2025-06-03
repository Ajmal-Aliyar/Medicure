import { inject, injectable } from "inversify";
import { IPatientController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPatientService } from "@/services";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "@/utils";
import { CLIENT_MESSAGES, HTTP_STATUS } from "@/constants";

@injectable()
export class PatientController implements IPatientController {
  constructor(
    @inject(TYPES.PatientService)
    private readonly patientService: IPatientService
  ) {}

  getProfileDetails = async (req: Request, res: Response): Promise<void> => {
    console.log(req.user, 'sdffds');
    
    const patientId = req.user?.id as string;
    const patientProfile = await this.patientService.getProfile(patientId);
    if (!patientProfile) {
      errorResponse(
        res,
        HTTP_STATUS.NOT_FOUND,
        CLIENT_MESSAGES.VALIDATION.USER_NOT_FOUND
      );
    }
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.PROFILE_FETCHED,
      patientProfile
    );
  };
}
