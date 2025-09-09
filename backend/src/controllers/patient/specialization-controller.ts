import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS, SPECIALIZATION_MESSAGES } from "@/constants";
import { IPatientSpecializationController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPatientSpecializationService } from "@/services";

@injectable()
export class PatientSpecializationController implements IPatientSpecializationController {
  constructor(
    @inject(TYPES.PatientSpecializationService)
    private readonly _specializationService: IPatientSpecializationService
  ) {}

  getPublicDetails = async (_req: Request, res: Response): Promise<void> => {
    const data = await this._specializationService.getPublicSpecializationDetails();
    successResponse(
      res,
      HTTP_STATUS.OK,
      SPECIALIZATION_MESSAGES.SPECIALIZATION_FETCHED,
      data
    );
  };
}
