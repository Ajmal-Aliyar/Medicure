import { IWeeklySchedule } from "@/models";

export type DoctorScheduleCreateInput = {
  doctorId: string;
  weeklySchedule: IWeeklySchedule;
  autoApprove: boolean;
  advanceBooking: number;
  timezone: string;
  isActive?: boolean;
  version: number;
  lastUpdated: Date;
};
