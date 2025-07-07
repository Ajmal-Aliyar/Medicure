import { IDoctorSchedule } from "@/models";

export interface IScheduleService {
    findActiveDoctorSchedules(): Promise<IDoctorSchedule[]>
}