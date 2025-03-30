import { IMedicalRecordRepository } from "../interfaces/IMedicatlRepository"
import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface"
import { MedicalRecordModel } from "../../models/medicalRecord/medicalRecordModel"
import { Types } from "mongoose"



export class MedicalRecordRepository implements IMedicalRecordRepository {
    async getMedicalRecords (patientId: string): Promise<IMedicalRecord[]> {
        return await MedicalRecordModel.find({patientId})
    }

  async createRecord({doctorId, patientId}:{doctorId: string, patientId: string}): Promise<IMedicalRecord> {
    const record = new MedicalRecordModel({doctorId, patientId});
    return await record.save();
  }

  async getRecordById(id: string,skip: number, limit: number): Promise<IMedicalRecord | null> {
    return await MedicalRecordModel.findById(id).skip(skip).limit(limit)
  }

  async getUserRecordById(patientId: string, skip: number, limit: number): Promise<{ prescriptions: IMedicalRecord[], total: number }> {
    const prescriptions = await MedicalRecordModel.aggregate([
      { $match: { patientId } },
      {
        $lookup: {
          from: 'doctors',
          let: { doctorId: '$doctorId' },
          pipeline: [
            { $match: { $expr: { $eq: [{ $toString: '$_id' }, '$$doctorId'] } } },
            { $project: { profileImage: 1, fullName: 1, specialization: 1 } }
          ],
          as: 'doctorDetails'
        }
      },
      {
        $unwind: {
          path: '$doctorDetails',
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $project: {
          _id: 1,
          diagnosis: 1,
          prescription: 1,
          allergy: 1,
          dateOfExamination: 1,
          isCompleted: 1,
          createdAt: 1,
          'doctorDetails.profileImage': 1,
          'doctorDetails.fullName': 1,
          'doctorDetails.specialization': 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]);
  
    const total = await MedicalRecordModel.countDocuments({ patientId });
  
    return { prescriptions, total };
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
