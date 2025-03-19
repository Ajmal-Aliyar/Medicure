import { IMedicalRecord } from "../../models/medicalRecord/medicalRecordInterface";

export interface IMedicalRecordServices {
    getRecordById(id: string): Promise<IMedicalRecord | null>;
    getAllRecords(): Promise<IMedicalRecord[]>;
    updateRecord(id: string, data: Partial<IMedicalRecord>): Promise<IMedicalRecord | null>;
    deleteRecord(id: string): Promise<boolean>;
}
