import { TYPES } from "@/di/types";
import { IMedicalRecordRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IPatientMedicalRecordService } from "../interfaces";
import { IPagination } from "@/interfaces";
import { IMedicalRecord } from "@/models";
import { Types } from "mongoose";

@injectable()
export class PatientMedicalRecordService
  implements IPatientMedicalRecordService
{
  constructor(
    @inject(TYPES.MedicalRecordRepository)
    private readonly _medicalRecordRepo: IMedicalRecordRepository
  ) {}

  async uploadMedicalRecord(
    patientId: string,
    fileUrl: string,
    fileName: string
  ): Promise<IMedicalRecord> {
    return await this._medicalRecordRepo.create({ patientId: new Types.ObjectId(patientId), fileName, fileUrl});
  }

  async getMedicalRecords (
      patientId: string,
      pagination: IPagination
    ): Promise<{ data: IMedicalRecord[]; total: number }> {  
      const { data, total } = await this._medicalRecordRepo.findAll({
        filter: { patientId},
        ...pagination,
        sort: { uploadedAt: -1 },
      });
      return { data, total };
    }
}
