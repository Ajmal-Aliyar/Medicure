import { IWeeklySchedule } from "@/models";
import { Types } from "mongoose";

export type DoctorScheduleDTO = {
  doctorId: Types.ObjectId;
  weeklySchedule: IWeeklySchedule;
  autoApprove: boolean;
  advanceBooking: number;
  timezone: string;
  isActive?: boolean;
  version: number;
  lastUpdated: Date;
};
