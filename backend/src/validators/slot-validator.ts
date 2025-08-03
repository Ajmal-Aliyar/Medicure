import { z } from "zod";

export const filterSlotQuerySchema = z.object({
  doctorId: z.string().optional(),
  patientId: z.string().optional(),

  type: z.enum(["consult", "emergency"]).optional(),

  isBooked: z
    .preprocess((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    }, z.boolean().optional()),

  isActive: z
    .preprocess((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    }, z.boolean().optional()),

  status: z.enum(["available", "booked", "cancelled", "completed"]).optional(),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date value",
    })
    .optional(),

 

  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .transform(Number)
    .optional(),
});

export type FilterSlotQuery = z.infer<typeof filterSlotQuerySchema>;
