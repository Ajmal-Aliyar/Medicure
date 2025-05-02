import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface";
import { IMedicalRecordRepository } from "../../repositories/interfaces/IMedicatlRepository";
import { IMedicalRecordServices } from "../interfaces/IMedicalRecordServices";

export class MedicalRecordServices implements IMedicalRecordServices {
  private medicalRecordRepository: IMedicalRecordRepository;

  constructor(medicalRecordRepository: IMedicalRecordRepository) {
    this.medicalRecordRepository = medicalRecordRepository;
  }

  async getRecordById(
    recordId: string,
    skip: number,
    limit: number
  ): Promise<IMedicalRecord | null> {
    try {
      return await this.medicalRecordRepository.getRecordById(recordId, skip, limit);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserRecordById(
    userId: string,
    skip: number,
    limit: number
  ): Promise<{ prescriptions: IMedicalRecord[]; total: number }> {
    try {
      return await this.medicalRecordRepository.getUserRecordById(
        userId,
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
    recordId: string,
    data: Partial<IMedicalRecord>
  ): Promise<IMedicalRecord | null> {
    try {
      return await this.medicalRecordRepository.updateRecord(recordId, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteRecord(recordId: string): Promise<boolean> {
    try {
      const deleted = await this.medicalRecordRepository.deleteRecord(recordId);
      return deleted !== null;
    } catch (error: unknown) {
      throw error;
    }
  }
}
