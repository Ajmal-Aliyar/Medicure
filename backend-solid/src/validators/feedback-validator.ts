import { z } from "zod";

export const medicationSchema = z.object({
  medicineName: z.string().min(1, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
  instructions: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  refills: z.number().min(0, "Refills cannot be negative"),
});

export const prescriptionSchema = z.object({
  doctorId: z.string().optional(),
  patientId: z.string().optional(),
  appointmentId: z.string().optional(),

  medications: z.array(medicationSchema),
  diagnosis: z.array(z.string().min(1)).min(1, "At least one diagnosis is required"),
  symptoms: z.array(z.string().min(1)).min(1, "At least one symptom is required"),
  notes: z.string().optional(),

  issuedDate: z.coerce.date({ errorMap: () => ({ message: "Issued date is invalid" }) }),
  validUntil: z.coerce.date({ errorMap: () => ({ message: "Valid until date is invalid" }) }),

  followUpRequired: z.boolean(),
  followUpDate: z.coerce
    .date({ errorMap: () => ({ message: "Follow-up date is invalid" }) })
    .optional()
    .refine((date) => !date || date instanceof Date, { message: "Invalid follow-up date" }),

  allergies: z.array(z.string().min(1)).optional(),
});


