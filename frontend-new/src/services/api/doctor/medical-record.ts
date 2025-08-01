import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IMedicalRecord, IMedicalRecordService } from "@/types/medical-record";

const BASE_URL = '/api/doctor/medical-record';
export const doctorMedicalRecordService: IMedicalRecordService = {
      getMedicalRecords: async(page: number, appointmentId: string): Promise<{ data: IMedicalRecord[], meta: MetaType}> => {
        const response = await api.get<{ data: IMedicalRecord[], meta: MetaType }>(`${BASE_URL}/${appointmentId}?page=${page}`)
        return response.data
      }
}