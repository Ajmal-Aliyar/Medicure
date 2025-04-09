import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface";
import { IMedicalRecordRepository } from "../../repositories/interfaces/IMedicatlRepository";
import { IMedicalRecordServices } from "../interfaces/IMedicalRecordServices";

export class MedicalRecordServices implements IMedicalRecordServices {
  private medicalRecordRepository: IMedicalRecordRepository;

  constructor(medicalRecordRepository: IMedicalRecordRepository) {
    this.medicalRecordRepository = medicalRecordRepository;
  }

  async getRecordById(
    id: string,
    skip: number,
    limit: number
  ): Promise<IMedicalRecord | null> {
    try {
      return await this.medicalRecordRepository.getRecordById(id, skip, limit);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserRecordById(
    _id: string,
    skip: number,
    limit: number
  ): Promise<{ prescriptions: IMedicalRecord[]; total: number }> {
    try {
      return await this.medicalRecordRepository.getUserRecordById(
        _id,
        skip,
        limit
      );
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAllRecords(): Promise<IMedicalRecord[]> {
    try {
      return await this.medicalRecordRepository.getAllRecords();
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateRecord(
    id: string,
    data: Partial<IMedicalRecord>
  ): Promise<IMedicalRecord | null> {
    try {
      return await this.medicalRecordRepository.updateRecord(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteRecord(id: string): Promise<boolean> {
    try {
      const deleted = await this.medicalRecordRepository.deleteRecord(id);
      return deleted !== null;
    } catch (error: unknown) {
      throw error;
    }
  }
}
