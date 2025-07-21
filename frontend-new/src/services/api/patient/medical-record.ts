import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IMedicalRecord, IMedicalRecordService } from "@/types/medical-record";

interface IPatientMedicalRecordService extends IMedicalRecordService {
updateMedicalRecords(fileUrl: string, fileName: string): Promise<IMedicalRecord>
}

const BASE_URL = '/api/patient/medical-record';
export const patientMedicalRecordService: IPatientMedicalRecordService = {
     updateMedicalRecords: async (fileUrl: string, fileName: string): Promise<IMedicalRecord> => {
        const response = await api.post<{ data: IMedicalRecord}>(
          `${BASE_URL}/upload`, { fileUrl, fileName });
        return response.data.data;
      },

      getMedicalRecords: async(page: number): Promise<{ data: IMedicalRecord[], meta: MetaType}> => {
        const response = await api.get<{ data: IMedicalRecord[], meta: MetaType }>(`${BASE_URL}?page=${page}`)
        return response.data
      }
}