import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(3).max(100),
  headline: z.string().max(150).optional().nullable(),
  about: z.string().max(1000).optional().nullable(),
  dob: z.string().min(3).max(100),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/).optional().nullable(),
  addressLine: z.string().max(200).optional().nullable(),
  street: z.string().max(200).optional().nullable(),
  specialization: z.string().min(3).max(100),
  languageSpoken: z.array(z.string()).min(1),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(100).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  pincode: z.string().max(20).optional().nullable(),
});

export const profileImageSchema = z.object({
  profileImage: z.string().url(),
});

export const professionalVerificationSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  registrationCouncil: z.string().min(1, "Registration council is required"),
//   registrationYear: z
//     .number()
//     .int()
//     .min(1900)
//     .max(new Date().getFullYear())
//     .refine((val) => val <= new Date().getFullYear(), {
//       message: "Registration year must be in the past",
//     }),
registrationYear: z.string().min(3).max(100),
  degree: z.string().min(1, "Degree is required"),
  university: z.string().min(1, "University is required"),
  yearOfCompletion: z.string().min(3).max(100),
    // .number()
    // .int()
    // .min(1900)
    // .max(new Date().getFullYear(), "Year of completion must be valid"),
  yearsOfExperience: z.string().min(1).max(2),
    // .number()
    // .int()
    // .min(0)
    // .max(100, "Years of experience must be a valid number"),
});


export const verificationProofsSchema = z.object({
  establishmentProof: z
    .string({
      required_error: "Establishment proof is required",
    })
    .min(1, "Establishment proof cannot be empty").nullable()
    .optional(),

  identityProof: z
    .string({
      required_error: "Identity proof is required",
    })
    .min(1, "Identity proof cannot be empty").nullable()
    .optional(),

  medicalRegistration: z
    .string({
      required_error: "Medical registration proof is required",
    })
    .min(1, "Medical registration proof cannot be empty").nullable()
    .optional(),
});


