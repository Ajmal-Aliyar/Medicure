import { AUTH_MESSAGES } from "@/constants/messages";
import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .email({ message: AUTH_MESSAGES.VALIDATION.EMAIL_INVALID }),
  password: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
    .min(8, { message: AUTH_MESSAGES.VALIDATION.PASSWORD_MIN }),
  fullName: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.FULL_NAME_REQUIRED })
    .min(3, { message: AUTH_MESSAGES.VALIDATION.FULL_NAME_MIN })
    .max(30, { message: AUTH_MESSAGES.VALIDATION.FULL_NAME_MAX }),
  mobile: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.MOBILE_REQUIRED })
    .length(10, { message: AUTH_MESSAGES.VALIDATION.MOBILE_INVALID_LENGTH }),
  role: z.enum(["doctor", "patient"], {
    required_error: AUTH_MESSAGES.VALIDATION.ROLE_REQUIRED,
    invalid_type_error: AUTH_MESSAGES.VALIDATION.ROLE_INVALID,
  }),
}).strict();

export const loginSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .email({ message: AUTH_MESSAGES.VALIDATION.EMAIL_INVALID }),
  password: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED })
    .min(8, { message: AUTH_MESSAGES.VALIDATION.PASSWORD_MIN }),
  role: z.enum(["doctor", "patient", "admin"], {
    required_error: AUTH_MESSAGES.VALIDATION.ROLE_REQUIRED,
    invalid_type_error: AUTH_MESSAGES.VALIDATION.ROLE_INVALID,
  }),
});

export const verifyOtpSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .email({ message: AUTH_MESSAGES.VALIDATION.EMAIL_INVALID }),
  otp: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.OTP_REQUIRED })
    .min(6, { message: AUTH_MESSAGES.VALIDATION.OTP_MIN }),
});

export const resendOtpSchema = z.object({
  email: z
    .string({ required_error: AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED })
    .email({ message: AUTH_MESSAGES.VALIDATION.EMAIL_INVALID }),
});
