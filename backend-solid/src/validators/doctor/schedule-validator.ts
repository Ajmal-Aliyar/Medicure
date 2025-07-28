import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const shiftSchema = z.object({
  startTime: z.string().regex(timeRegex, "Invalid startTime format (HH:mm)"),
  endTime: z.string().regex(timeRegex, "Invalid endTime format (HH:mm)"),
  type: z.enum(["consult", "emergency"]).optional(),
  duration: z.number().min(1, "Minimum 1 minute"),
  fees: z.number().min(0),
  buffer: z.number().min(0).optional()
});

const dayScheduleSchema = z.object({
  shifts: z.array(shiftSchema)
});

const weeklyScheduleSchema = z.object({
  monday: dayScheduleSchema.optional(),
  tuesday: dayScheduleSchema.optional(),
  wednesday: dayScheduleSchema.optional(),
  thursday: dayScheduleSchema.optional(),
  friday: dayScheduleSchema.optional(),
  saturday: dayScheduleSchema.optional(),
  sunday: dayScheduleSchema.optional()
});

export const updateDoctorScheduleSchema = z.object({
  weeklySchedule: weeklyScheduleSchema.optional(),
  autoApprove: z.boolean().optional(),
  advanceBooking: z.number().min(0).max(365).optional(), 
  isActive: z.boolean().optional(),
}).strict();

