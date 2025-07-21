import type { MetaType } from "./common";

export interface IMedicalRecord {
    fileUrl: string;
    fileName: string;
    uploadedAt: string;
}


export interface IMedicalRecordService {
    getMedicalRecords(page: number, appointmentId?: string): Promise<{ data: IMedicalRecord[], meta: MetaType}>
}