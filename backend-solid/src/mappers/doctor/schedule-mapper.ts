import { DoctorScheduleCreateInput } from "@/dtos";
import { IDoctorSchedule } from "@/models";
import { Types } from "mongoose";


export class DoctorScheduleMapper {
    static toDoctorScheduleCreate(
    doctorId: string,
    data: Partial<IDoctorSchedule>
  ): DoctorScheduleCreateInput {
    return {
      doctorId: new Types.ObjectId(doctorId),
      weeklySchedule: data.weeklySchedule || {},
      autoApprove: data.autoApprove ?? false,
      advanceBooking: data.advanceBooking ?? 0,
      timezone: data.timezone || "Asia/Kolkata",
      isActive: data.isActive ?? true,
      version: 1,
      lastUpdated: new Date()
    };
  }

  static toDoctorScheduleUpdate(
    data: Partial<IDoctorSchedule>,
    existing: IDoctorSchedule
  ): Partial<IDoctorSchedule> {
    const update: Partial<IDoctorSchedule> = {
      weeklySchedule: data.weeklySchedule ?? existing.weeklySchedule,
      autoApprove: data.autoApprove ?? existing.autoApprove,
      advanceBooking: data.advanceBooking ?? existing.advanceBooking,
      timezone: data.timezone ?? existing.timezone,
      isActive: data.isActive ?? existing.isActive,
      lastUpdated: new Date()
    };

    // ⬆️ Conditional version bump
    const shouldBumpVersion =
      data.weeklySchedule &&
      JSON.stringify(data.weeklySchedule) !== JSON.stringify(existing.weeklySchedule);

    if (shouldBumpVersion) {
    //   update.version = existing.version + 1;
    } else {
      update.version = existing.version; // Keep current version
    }

    return update;
  }

}
