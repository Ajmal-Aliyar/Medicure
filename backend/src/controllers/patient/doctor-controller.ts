import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS, CLIENT_MESSAGES, ADMIN_MESSAGES } from "@/constants";
import { IPatientDoctorController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPatientDoctorService } from "@/services";
import { filterDoctorQuerySchema } from "@/validators";

@injectable()
export class PatientDoctorController implements IPatientDoctorController {
  constructor(
    @inject(TYPES.PatientDoctorService)
    private readonly doctorService: IPatientDoctorService
  ) {}

  getPublicDetails = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const pagination = getPaginationParams(req);
      const parsedQuery = filterDoctorQuerySchema.parse(req.query);
      const { total, doctors } =
        await this.doctorService.getPublicDoctorDetails( parsedQuery, pagination);
      const meta = buildPaginationMeta(total, pagination.skip);
      successResponse(
        res,
        HTTP_STATUS.OK,
        ADMIN_MESSAGES.SUCCESS.DOCTORS_DETAILS_FETCHED,
        doctors,
        meta
      );
    };
}
