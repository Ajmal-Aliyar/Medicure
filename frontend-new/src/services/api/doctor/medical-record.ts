import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IMedicalRecord, IMedicalRecordService } from "@/types/medical-record";

interface IDoctorMedicalRecordService extends IMedicalRecordService {}

const BASE_URL = '/api/doctor/medical-record';
export const doctorMedicalRecordService: IDoctorMedicalRecordService = {
      getMedicalRecords: async(page: number, appointmentId: string): Promise<{ data: IMedicalRecord[], meta: MetaType}> => {
        const response = await api.get<{ data: IMedicalRecord[], meta: MetaType }>(`${BASE_URL}/${appointmentId}?page=${page}`)
        return response.data
      }
}