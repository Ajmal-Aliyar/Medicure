import { DoctorScheduleDTO } from "@/dtos";
import { IDoctorSchedule } from "@/models";

export interface IDoctorScheduleService {
  getSchedule(doctorId: string): Promise<DoctorScheduleDTO | null>;
  upsertSchedule(
    doctorId: string,
    data: Partial<IDoctorSchedule>): Promise<{ schedule: DoctorScheduleDTO, message: string }>;
}
