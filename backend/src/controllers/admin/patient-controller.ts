import { ADMIN_MESSAGES, HTTP_STATUS } from "@/constants";
import { TYPES } from "@/di/types";
import { IAdminPatientService } from "@/services";
import {
  buildPaginationMeta,
  getPaginationParams,
  successResponse,
} from "@/utils";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAdminPatientController } from "../interfaces";
import { filterPatientQuerySchema } from "@/validators";

@injectable()
export class AdminPatientController implements IAdminPatientController {
  constructor(
    @inject(TYPES.AdminPatientService)
    private readonly _adminPatientService: IAdminPatientService
  ) {}


   getPatientsSummary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const pagination = getPaginationParams(req);
    const parsedQuery = filterPatientQuerySchema.parse(req.query);
    const { total, Patients } =
      await this._adminPatientService.getFilteredPatient( parsedQuery, pagination);
    const meta = buildPaginationMeta(total, pagination.skip);
    successResponse(
      res,
      HTTP_STATUS.OK,
      'Fetched patients successfully.',
      Patients,
      meta
    );
  };

  getPatientProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const PatientId = req.params.PatientId as string;
    const Patient = await this._adminPatientService.getPatientProfile(
      PatientId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Patient profile fetched successfully.",
      Patient
    );
  };


  blockPatient = async(req: Request, res: Response): Promise<void> => {
    const { PatientId } = req.params;
    const { reason } = req.body;
    await this._adminPatientService.blockPatient(PatientId, reason);
    successResponse(res, HTTP_STATUS.OK, "Patient blocked successfully.", true);
  }

  unblockPatient = async(req: Request, res: Response): Promise<void> => {
    const { PatientId } = req.params;
    await this._adminPatientService.unblockPatient(PatientId);
    successResponse(res, HTTP_STATUS.OK, "Patient unblocked successfully.", true);
  }
}
