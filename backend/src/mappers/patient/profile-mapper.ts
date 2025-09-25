import { PatientProfileDTO } from "@/dtos";
import { IPatient } from "@/models";

export class PatientProfileMapper {
  static toPatientDto(patient: IPatient): PatientProfileDTO {
    const { _id, contact } = patient;
    const { password, ...safePersonal } = patient.personal;

    return {
      id: String(_id),
      personal: safePersonal,
      contact,
      status: patient.status,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt
    };
  }

  static toPatientUpdate(dto: PatientProfileDTO): Partial<IPatient> {
    const { address } = dto.contact;
    const updates: Record<string, string | string[]> = {};

    if (dto.personal.fullName !== undefined) {
      updates["personal.fullName"] = dto.personal.fullName;
    }
    if (dto.personal.dob !== undefined) {
      updates["personal.dob"] = dto.personal.dob;
    }
    if (dto.personal.gender !== undefined) {
      updates["personal.gender"] = dto.personal.gender;
    }
    if (dto.personal.languageSpoken !== undefined) {
      updates["personal.languageSpoken"] = dto.personal.languageSpoken;
    }
    if (dto.personal.mobile !== undefined) {
      updates["personal.mobile"] = dto.personal.mobile;
    }
    if (dto.personal.bloodGroup !== undefined) {
      updates["personal.bloodGroup"] = dto.personal.bloodGroup;
    }

    if (address.city !== undefined) {
      updates["contact.address.city"] = address.city;
    }
    if (address.country !== undefined) {
      updates["contact.address.country"] = address.country;
    }
    if (address.street !== undefined) {
      updates["contact.address.street"] = address.street;
    }
    if (address.pincode !== undefined) {
      updates["contact.address.pincode"] = address.pincode;
    }
    if (address.state !== undefined) {
      updates["contact.address.state"] = address.state;
    }


    return updates;
  }
}
