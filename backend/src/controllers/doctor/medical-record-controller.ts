import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { IDoctorMedicalRecordController } from "../interfaces";
import { IDoctorMedicalRecordService } from "@/services";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class DoctorMedicalRecordController implements IDoctorMedicalRecordController {
    constructor(@inject(TYPES.DoctorMedicalRecordService) private readonly _medicalRecordService: IDoctorMedicalRecordService) {}

    getPatientMedicalRecordsByAppointmentId = async(req: Request, res: Response): Promise<void> => {
        const { appointmentId } = req.params
        const { id } = req.user;
        const pagination = getPaginationParams(req)
        const { data, total } = await this._medicalRecordService.getReportsByAppointmentId( id, appointmentId, pagination)
        const meta = buildPaginationMeta(total, pagination.skip)
        successResponse( res, HTTP_STATUS.OK, "Patient medical record fetched successfully.", data, meta)
    }
}