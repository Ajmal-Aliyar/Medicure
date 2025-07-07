import { z } from "zod";

export const filterDoctorQuerySchema = z.object({
  query: z.string().optional(),
  language: z.string().optional(),
  profileStatus: z.string().optional(),
  specialization: z.string().optional(),
  accountStatus: z.string().optional(),

  experienceMin: z.string().regex(/^\d+$/, "Must be a number").optional(),
  experienceMax: z.string().regex(/^\d+$/, "Must be a number").optional(),

  ratingMin: z.string().regex(/^\d+(\.\d+)?$/, "Must be a number").optional(),
  ratingMax: z.string().regex(/^\d+(\.\d+)?$/, "Must be a number").optional(),

  sortField: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),

  page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
});

export type FilterDoctorQuery = z.infer<typeof filterDoctorQuerySchema>;
