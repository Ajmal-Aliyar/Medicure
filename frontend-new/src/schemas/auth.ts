import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email required.' })
    .email({ message: 'Invalid email format.' }),
  password: z
    .string({ required_error: 'Password required.' })
    .min(8, { message: "Password should be minimun 8" }),
  role: z.enum(["doctor", "patient", "admin"], {
    required_error: "Role required",
    invalid_type_error: "Invalid role.",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
