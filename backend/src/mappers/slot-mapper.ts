import { CategorizedSlots, ISlotDetailsDTO, PublicSlotDetailsDTO } from "@/dtos";
import { IRole } from "@/interfaces";
import { ISlot } from "@/models";
import { FilterSlotQuery } from "@/validators/slot-validator";
import { Types } from "mongoose";

export class SlotMapper {
  static toGetSlotByDoctorAndDate(
    doctorId: string,
    data: ISlot[]
  ): CategorizedSlots {
    const categorized: CategorizedSlots = {
      morning: [],
      afternoon: [],
      evening: [],
      night: [],
      lateNight: [],
    };

    data.forEach((slot) => {
      const hour = parseInt(slot.startTime.split(":")[0]);

      if (hour >= 6 && hour < 12) {
        categorized.morning.push(slot);
      } else if (hour >= 12 && hour < 16) {
        categorized.afternoon.push(slot);
      } else if (hour >= 16 && hour < 20) {
        categorized.evening.push(slot);
      } else if (hour >= 20 && hour < 24) {
        categorized.night.push(slot);
      } else {
        categorized.lateNight.push(slot);
      }
    });

    return categorized;
  }

  static toPublicSlotDetails(slots: ISlot[]): PublicSlotDetailsDTO[] {
    return slots.map(
      (slot): PublicSlotDetailsDTO => ({
        id: String(slot._id),
        doctorId: slot.doctorId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        date: slot.date,
        type: slot.type,
        duration: slot.duration,
        fees: slot.fees,
        status: slot.status,
        isActive: slot.isActive,
      })
    );
  }

  static toSlotFiltersToQuery = (filters: FilterSlotQuery, role: IRole) => {
  const query: Record<string, any> = {};

  if (filters.doctorId) query.doctorId = new Types.ObjectId(filters.doctorId);
  if (filters.date) query.date = filters.date;
  if (filters.type) query.type = filters.type;
  if (filters.status) query.status = filters.status;
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
if (filters.isBooked !== undefined) {
    query["bookingDetails.isBooked"] = filters.isBooked;
  }

  if (filters.patientId && role === "admin") {
    query["bookingDetails.patientId"] = new Types.ObjectId(filters.patientId);
  }

  return query;
};


  static toSlotDetails(slots: ISlot[], id:string,  role: string): ISlotDetailsDTO[] {
    return slots.map(
      (slot): ISlotDetailsDTO => ({
        id: String(slot._id),
        doctorId:  String(slot.doctorId),
        startTime: slot.startTime,
        endTime: slot.endTime,
        date: slot.date,
        type: slot.type,
        duration: slot.duration,
        fees: slot.fees,
        status: slot.status,
        isActive: slot.isActive,
        ...(role === "admin" && { bookingDetails: slot.bookingDetails } || id ===  String(slot.doctorId) && { bookingDetails: slot.bookingDetails }),
      })
    );
  }
}
