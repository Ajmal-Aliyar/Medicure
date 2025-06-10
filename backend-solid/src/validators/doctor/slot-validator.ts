import { z } from "zod";

export const getSlotsByDoctorAndDateSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date value",
    }),
  isActive: z
    .preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean().optional()),
  status: z.enum(["available", "booked", "cancelled", "completed"]).optional(),
});