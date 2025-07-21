import { IPagination } from "@/interfaces";
import { IMedicalRecord } from "@/models";

export interface IDoctorMedicalRecordService {
  getReportsByAppointmentId(
    doctorId: string,
    appointmentId: string,
    pagination: IPagination
  ): Promise<{ data: IMedicalRecord[]; total: number }>;
}
