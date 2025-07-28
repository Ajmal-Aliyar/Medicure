import { z } from "zod";

export const filterAppointmentQuerySchema = z.object({
  appointmentType: z.string().optional(),
  appointmentDate: z.string().optional(),
  status: z.string().optional(),
  page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
});

export type FilterAppointmentQuery = z.infer<typeof filterAppointmentQuerySchema>;
