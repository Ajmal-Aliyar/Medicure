import { IMedicalRecordRepository } from "../interfaces/IMedicatlRepository"
import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface"
import { MedicalRecordModel } from "../../models/medicalRecord/medicalRecordModel"




export class MedicalRecordRepository implements IMedicalRecordRepository {
    async getMedicalRecords (patientId: string): Promise<IMedicalRecord[]> {
        return await MedicalRecordModel.find({patientId})
    }

  async createRecord({doctorId, patientId}:{doctorId: string, patientId: string}): Promise<IMedicalRecord> {
    const record = new MedicalRecordModel({doctorId, patientId});
    return await record.save();
  }

  async getRecordById(id: string): Promise<IMedicalRecord | null> {
    return await MedicalRecordModel.findById(id);
  }

  async getAllRecords(): Promise<IMedicalRecord[]> {
    return await MedicalRecordModel.find();
  }

  async updateRecord(id: string, data: Partial<IMedicalRecord>): Promise<IMedicalRecord | null> {
    return await MedicalRecordModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRecord(id: string): Promise<IMedicalRecord | null> {
    return await MedicalRecordModel.findByIdAndDelete(id);
  }
}

export default new MedicalRecordRepository();
