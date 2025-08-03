import { IPagination } from "@/interfaces";
import { IMedicalRecord } from "@/models";

export interface IPatientMedicalRecordService {
  uploadMedicalRecord(
      patientId: string,
      fileUrl: string,
      fileName: string
    ): Promise<IMedicalRecord>;
    getMedicalRecords (
          patientId: string,
          pagination: IPagination
        ): Promise<{ data: IMedicalRecord[]; total: number }>
}
