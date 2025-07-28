import type { IShift } from "@/types/schedule";

export const isOverlapping = (shifts: IShift[], newShift: IShift, ignoreIndex: number = -1): boolean => {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const newStart = toMinutes(newShift.startTime);
  const newEnd = toMinutes(newShift.endTime);

  return shifts.some((shift, idx) => {
    if (idx === ignoreIndex) return false; 
    const start = toMinutes(shift.startTime);
    const end = toMinutes(shift.endTime);
    return newStart < end && newEnd > start;
  });
};
