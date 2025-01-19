import { IMedicalRecordRepository } from "../interfaces/IMedicatlRepository"
import { IMedicalReport } from "../../models/medicalRecord/medicalRecordInterface"
import { MedicalRecordModel } from "../../models/medicalRecord/medicalRecordModel"




export class MedicalRecordRepository implements IMedicalRecordRepository {
    async getMedicalRecords (patientId: string): Promise<IMedicalReport[]> {
        return await MedicalRecordModel.find({patientId})
    }
}