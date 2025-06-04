import { PatientProfileDto } from "@/dtos";
import { IPatient } from "@/models";

export class PatientProfileMapper {
  static toPatientDto(patient: IPatient): PatientProfileDto {
    const { contact } = patient;
    const { password, ...safePersonal } = patient.personal;

    return {
      personal: safePersonal,
      contact,
    };
  }

  static toPatientUpdate(dto: PatientProfileDto): Partial<IPatient> {
    console.log(dto,'ds');
    
    const { address, emergencyContact } = dto.contact;
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

    if (address.addressLine !== undefined) {
      updates["contact.address.addressLine"] = address.addressLine;
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

    if (emergencyContact.name !== undefined) {
      updates["contact.emergencyContact.name"] = emergencyContact.name;
    }
    if (emergencyContact.phone !== undefined) {
      updates["contact.emergencyContact.phone"] = emergencyContact.phone;
    }
    if (emergencyContact.relation !== undefined) {
      updates["contact.emergencyContact.relation"] = emergencyContact.relation;
    }

    return updates;
  }
}
