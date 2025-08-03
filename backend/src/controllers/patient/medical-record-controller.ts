import { TYPES } from "@/di/types";
import { IPatientMedicalRecordService } from "@/services";
import { inject, injectable } from "inversify";
import { IPatientMedicalRecordController } from "../interfaces";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class PatientMedicalRecordController
  implements IPatientMedicalRecordController
{
  constructor(
    @inject(TYPES.PatientMedicalRecordService)
    private readonly medicalRecordService: IPatientMedicalRecordService
  ) {}

  uploadMedicalRecord = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const { fileName, fileUrl } = req.body;
    const medicalRecord = await this.medicalRecordService.uploadMedicalRecord(
      id,
      fileUrl,
      fileName
    );
    successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Medical record uploaded successfully.",
      medicalRecord
    );
  };

  getMedicalRecords = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.user;
    const pagination = getPaginationParams(req);
    const { data, total } =
      await this.medicalRecordService.getMedicalRecords(
        id,
        pagination
      );
    const meta = buildPaginationMeta(total, pagination.skip);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Patient medical record fetched successfully.",
      data,
      meta
    );
  };
}
