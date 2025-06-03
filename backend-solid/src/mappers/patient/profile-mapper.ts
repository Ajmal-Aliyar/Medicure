import { PatientProfileDto } from "@/dtos";
import { IPatient } from "@/models";

export class PatientProfileMapper {
   static toPatientDto(patient: IPatient): PatientProfileDto {
    const { status, contact } = patient;
    const { password, ...safePersonal } = patient.personal;

    return {
      id: String(patient._id),
      personal: safePersonal,
      contact,
      status,
    };
  }
}