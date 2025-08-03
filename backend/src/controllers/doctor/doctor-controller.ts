import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { errorResponse, successResponse } from "@/utils";
import { HTTP_STATUS, CLIENT_MESSAGES } from "@/constants";
import { ProfessionalVerificationDTO } from "@/dtos";
import { IDoctorService } from "@/services";
import { IDoctorController } from "../interfaces";

@injectable()
export class DoctorController implements IDoctorController {
  constructor(
    @inject(TYPES.DoctorService) private readonly doctorService: IDoctorService
  ) {}

  getProfileDetails = async (req: Request, res: Response): Promise<void> => {
    const doctorId = req.user?.id as string;
    const doctorProfile = await this.doctorService.getProfile(doctorId);
    if (!doctorProfile) {
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
      doctorProfile
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
    await this.doctorService.updateProfileImg(doctorId, profileImage);
    successResponse(res, HTTP_STATUS.OK, CLIENT_MESSAGES.SUCCESS.IMAGE_UPDATED);
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    const doctorId = req.user?.id as string;
    await this.doctorService.updateProfile(doctorId, req.body);
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.PROFILE_UPDATED
    );
  };

  updateProfessionalDetails = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId: string = req.user?.id as string;
    const payload: ProfessionalVerificationDTO = req.body;
    console.log(payload, 'payload');
    
    await this.doctorService.updateProfessionalDetails(doctorId, payload);
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.PROFESSIONAL_DETAILS_UPDATED
    );
  };

  getProfessionalDetails = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId = req.user?.id as string;
    const professionalDetails = await this.doctorService.getProfessionalDetails(
      doctorId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.PROFESSIONAL_DETAILS_FETCHED,
      professionalDetails
    );
  };

  getVerificationProofs = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId = req.user?.id as string;
    const verificationProofs = await this.doctorService.getVerificationProofs(
      doctorId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.VERIFICATION_PROOFS_FETCHED,
      verificationProofs
    );
  };

  updateVerificationProofs = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId = req.user?.id as string;
    await this.doctorService.updateVerificationProofs(doctorId, req.body);

    successResponse(
      res,
      HTTP_STATUS.OK,
      CLIENT_MESSAGES.SUCCESS.VERIFICATION_PROOFS_UPLOADED
    );
  };

  submitForReview = async (req: Request, res: Response): Promise<void> => {
   const doctorId = req.user?.id as string;
    await this.doctorService.submitForReview(doctorId);

    successResponse(
      res,
      HTTP_STATUS.ACCEPTED,
      CLIENT_MESSAGES.SUCCESS.SUBMITTED_FOR_REVIEW
    );
  }
}


