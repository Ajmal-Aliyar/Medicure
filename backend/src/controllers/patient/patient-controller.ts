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
    private readonly _patientService: IPatientService
  ) {}

  getProfileDetails = async (req: Request, res: Response): Promise<void> => {

    const patientId = req.user?.id as string;
    const patientProfile = await this._patientService.getProfile(patientId);
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

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    const patient = req.user?.id as string;
    await this._patientService.updateProfile(patient, req.body);
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.PROFILE_UPDATED
    );
  };

  updateProfileImage = async (req: Request, res: Response): Promise<void> => {
    const doctorId = req.user?.id as string;
    const { profileImage } = req.body;
    if (!profileImage) {
      errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        CLIENT_MESSAGES.ERROR.IMAGE_UPDATE_FAILED
      );
      return;
    }
    await this._patientService.updateProfileImg(doctorId, profileImage);
    successResponse(res, HTTP_STATUS.OK, CLIENT_MESSAGES.SUCCESS.IMAGE_UPDATED);
  };
}
