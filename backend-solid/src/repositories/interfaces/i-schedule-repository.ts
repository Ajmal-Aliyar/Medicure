import { IDoctorSchedule } from "@/models";
import { BaseRepository } from "../base";

export interface IScheduleRepository extends BaseRepository<IDoctorSchedule> {
  findByDoctorId(doctorId: string): Promise<IDoctorSchedule | null>;
  update(doctorId: string, data: Partial<IDoctorSchedule>): Promise<IDoctorSchedule | null>;
}
