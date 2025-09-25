import { FrontendPrescriptionPayloadDTO, PrescriptionFullDetailsDTO, ViewPrescriptionDTO } from "@/dtos";
import { IPrescription } from "@/models";
import { Types } from "mongoose";

export class PrescriptionMapper {
  static mapToPrescriptionData(
    payload: FrontendPrescriptionPayloadDTO
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

  static mapToViewPrescription(data: PrescriptionFullDetailsDTO): ViewPrescriptionDTO {
    const { _id, doctorId, patientId, appointmentId, ...prescription } = data
    return {
        ...prescription,
        id: data._id.toString(),
        appointment: {
            ...data.appointmentId
        },
        doctor: {
            ...data.doctorId
        },
        patient: {
            ...data.patientId
        },
        notes: data.notes || '',
        allergies: data.allergies || [],
        diagnosis: data.diagnosis || [],
        symptoms: data.symptoms || [],
        followUpDate: data.followUpDate || null
    }
  }
}
