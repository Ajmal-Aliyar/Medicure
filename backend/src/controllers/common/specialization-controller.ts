import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS, SPECIALIZATION_MESSAGES } from "@/constants";
import { ISpecializationController } from "../interfaces";
import { TYPES } from "@/di/types";
import { ISpecializationService } from "@/services";

@injectable()
export class SpecializationController implements ISpecializationController {
  constructor(
    @inject(TYPES.SpecializationService)
    private readonly _specializationService: ISpecializationService
  ) {}

  getPublicDetails = async (_req: Request, res: Response): Promise<void> => {
    const data = await this._specializationService.getPublicSpecialization();
    successResponse(
      res,
      HTTP_STATUS.OK,
      SPECIALIZATION_MESSAGES.SPECIALIZATION_FETCHED,
      data
    );
  };

  getSpecializationDetails= async (req: Request, res: Response): Promise<void> => {
    const {specialization} = req.params
    const data = await this._specializationService.getSpecializationDetails(specialization);
    successResponse(
      res,
      HTTP_STATUS.OK,
      SPECIALIZATION_MESSAGES.SPECIALIZATION_FETCHED,
      data
    );
  }
}
