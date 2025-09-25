import { MedicalRecordDTO } from "@/dtos";
import { IPagination } from "@/interfaces";

export interface IDoctorMedicalRecordService {
  getReportsByAppointmentId(
    doctorId: string,
    appointmentId: string,
    pagination: IPagination
  ): Promise<{ data: MedicalRecordDTO[]; total: number }>;
}
