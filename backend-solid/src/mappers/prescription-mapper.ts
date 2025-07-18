import { FrontendPrescriptionPayload } from "@/interfaces/common/Prescription";
import { IPrescription } from "@/models";
import { Types } from "mongoose";

export class PrescriptionMapper {
  static mapToPrescriptionData(
    payload: FrontendPrescriptionPayload
  ): Partial<IPrescription> {
    return {
      doctorId: new Types.ObjectId(payload.doctorId),
      patientId: new Types.ObjectId(payload.patientId),
      appointmentId: new Types.ObjectId(payload.appointmentId),
      medications: payload.medications,
      diagnosis: payload.diagnosis,
      symptoms: payload.symptoms,
      notes: payload.notes?.trim(),
      issuedDate: new Date(payload.issuedDate),
      validUntil: new Date(payload.validUntil),
      followUpRequired: payload.followUpRequired,
      followUpDate:
        payload.followUpRequired && payload.followUpDate
          ? new Date(payload.followUpDate)
          : undefined,
      allergies: payload.allergies,
    };
  }
}
