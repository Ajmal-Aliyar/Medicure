import { z } from "zod";

export const filterPatientQuerySchema = z.object({
  query: z.string().optional(),

  accountStatus: z.string().optional(),

  sortField: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),

  createdAt: z.string().optional(),

  page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
});

export type FilterPatientQuery = z.infer<typeof filterPatientQuerySchema>;
