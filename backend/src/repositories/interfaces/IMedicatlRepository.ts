import { IMedicalReport } from "../../models/medicalRecord/medicalRecordInterface";

export interface IMedicalRecordRepository {
    getMedicalRecords(patientId: string): Promise<IMedicalReport[]>
}