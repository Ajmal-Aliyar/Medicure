import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface";

export interface IMedicalRecordRepository {
    getMedicalRecords(patientId: string): Promise<IMedicalRecord[]>
    createRecord({doctorId, patientId}:{doctorId: string, patientId: string}): Promise<IMedicalRecord>
    getRecordById(id: string): Promise<IMedicalRecord | null> 
    getAllRecords(): Promise<IMedicalRecord[]>
    updateRecord(id: string, data: Partial<IMedicalRecord>): Promise<IMedicalRecord | null>
    deleteRecord(id: string): Promise<IMedicalRecord | null>
}