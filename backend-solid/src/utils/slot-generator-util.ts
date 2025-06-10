import { Day, IDoctorSchedule, IShift, ISlot } from "@/models";
import {
  parse,
  addMinutes,
  isBefore,
  format,
  addDays,
  startOfDay,
} from "date-fns";
import { Types } from "mongoose";

const DAYS: Day[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const splitShiftsIntoSlots = (
  doctorId: string,
  date: Date,
  shifts: IShift[]
): Partial<ISlot>[] => {
  const slots: Partial<ISlot>[] = [];

  for (const shift of shifts) {
    const {
      startTime,
      endTime,
      duration,
      buffer = 0,
      fees,
      type,
      isActive,
    } = shift;

    let start = parse(startTime, "HH:mm", date);
    const end = parse(endTime, "HH:mm", date);
    
    while (isBefore(addMinutes(start, duration), addMinutes(end, 1))) {
      const slotEnd = addMinutes(start, duration);

      slots.push({
        doctorId: new Types.ObjectId(doctorId),
        date: format(date, "yyyy-MM-dd"),
        startTime: format(start, "HH:mm"),
        endTime: format(slotEnd, "HH:mm"),
        type,
        duration,
        fees,
        isActive,
        status: "available",
      });

      start = addMinutes(slotEnd, buffer);
    }
  }

  return slots;
};

export const generateSlotsForAdvanceDays = (
  schedule: IDoctorSchedule
): Partial<ISlot>[] => {
  const { weeklySchedule, advanceBooking, doctorId } = schedule;
  const allSlots: Partial<ISlot>[] = [];

  for (let i = 1; i <= advanceBooking; i++) {
    const localDate = addDays(new Date(), i);
    const dayIndex = localDate.getDay();
    const day: Day = DAYS[dayIndex];

    const shifts = weeklySchedule[day]?.shifts;
    if (!shifts || shifts.length === 0) continue;

    const slots = splitShiftsIntoSlots(doctorId.toString(), localDate, shifts);
    allSlots.push(...slots);
  }

  return allSlots;
};
