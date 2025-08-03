import { IDoctorSchedule } from "@/models";

export interface IDoctorScheduleService {
  getSchedule(doctorId: string): Promise<IDoctorSchedule | null>;
  upsertSchedule(
    doctorId: string,
    data: Partial<IDoctorSchedule>): Promise<{ schedule: IDoctorSchedule, message: string }>;
}
