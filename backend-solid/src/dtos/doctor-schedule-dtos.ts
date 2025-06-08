import { IWeeklySchedule } from "@/models";
import { Types } from "mongoose";

export type DoctorScheduleCreateInput = {
  doctorId: Types.ObjectId;
  weeklySchedule: IWeeklySchedule;
  autoApprove: boolean;
  advanceBooking: number;
  timezone: string;
  isActive?: boolean;
  version: number;
  lastUpdated: Date;
};
