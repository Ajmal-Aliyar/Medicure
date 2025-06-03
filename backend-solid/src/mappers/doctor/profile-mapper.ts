import {
  DoctorProfileDTO,
  DoctorProfileUpdateDTO,
  ProfessionalVerificationDTO,
  VerificationProofsDto,
} from "@/dtos";
import { IDocument, IEducation } from "@/interfaces";
import { IDoctor } from "@/models";

export class DoctorProfileMapper {
  static toDoctor = (doctor: IDoctor): DoctorProfileDTO => {
    return {
      fullName: doctor.personal.fullName || "",
      headline: doctor.professional.headline || "",
      about: doctor.professional.about || "",
      profileImage: doctor.personal.profileImage || "",
      dob: doctor.personal.dob ? doctor.personal.dob : "",
      gender: doctor.personal.gender || "",
      phone: doctor.personal.mobile || "",
      specialization: doctor.professional.specialization || "",
      languageSpoken: doctor.personal.languageSpoken || [],
      address: {
        addressLine: `${doctor.location.street || ""}, ${
          doctor.location.city || ""
        }, ${doctor.location.state || ""} - ${doctor.location.pincode || ""}`,
        street: doctor.location.street || "",
        city: doctor.location.city || "",
        state: doctor.location.state || "",
        country: doctor.location.country || "",
        pincode: doctor.location.pincode || "",
      },
    };
  };

  static toDoctorUpdate = (dto: DoctorProfileUpdateDTO): Partial<IDoctor> => {
    const update: Partial<IDoctor> = {};

    const personalUpdates: { [key: string]: string | string[] } = {};
    const professionalUpdates: { [key: string]: string } = {};
    const locationUpdates: { [key: string]: string } = {};

    if (dto.fullName !== undefined)
      personalUpdates["personal.fullName"] = dto.fullName;
    if (dto.dob !== undefined) personalUpdates["personal.dob"] = dto.dob;
    if (dto.gender !== undefined)
      personalUpdates["personal.gender"] = dto.gender;
    if (dto.languageSpoken !== undefined)
      personalUpdates["personal.languageSpoken"] = dto.languageSpoken;
    if (dto.phone !== undefined) personalUpdates["personal.mobile"] = dto.phone;

    if (dto.headline !== undefined)
      professionalUpdates["professional.headline"] = dto.headline;
    if (dto.about !== undefined)
      professionalUpdates["professional.about"] = dto.about;
    if (dto.specialization !== undefined)
      professionalUpdates["professional.specialization"] = dto.specialization;

    if (dto.street !== undefined)
      locationUpdates["location.street"] = dto.street;
    if (dto.city !== undefined) locationUpdates["location.city"] = dto.city;
    if (dto.state !== undefined) locationUpdates["location.state"] = dto.state;
    if (dto.country !== undefined)
      locationUpdates["location.country"] = dto.country;
    if (dto.pincode !== undefined)
      locationUpdates["location.pincode"] = dto.pincode;

    return {
      ...personalUpdates,
      ...professionalUpdates,
      ...locationUpdates,
    };
  };

  static toProfessionalDetails = (
    doctor: IDoctor
  ): ProfessionalVerificationDTO => {
    const { professional } = doctor;
    return {
      registrationNumber: professional.registrationNumber,
      registrationCouncil: professional.registrationCouncil,
      registrationYear: professional.registrationYear,
      yearsOfExperience: professional.yearsOfExperience,
      degree: professional.education[0].degree,
      university: professional.education[0].university,
      yearOfCompletion: professional.education[0].yearOfCompletion,
    };
  };

  static toUpdateProfessionalDetails = (
    dto: ProfessionalVerificationDTO
  ): Partial<Pick<IDoctor, "professional">> & {
    [key: string]: string | number | IEducation[];
  } => {
    const update: { [key: string]: string | number | IEducation[] } = {};

    if (dto.registrationNumber !== undefined) {
      update["professional.registrationNumber"] = dto.registrationNumber;
    }

    if (dto.registrationCouncil !== undefined) {
      update["professional.registrationCouncil"] = dto.registrationCouncil;
    }

    if (dto.registrationYear !== undefined) {
      update["professional.registrationYear"] = dto.registrationYear;
    }

    if (dto.yearsOfExperience !== undefined) {
      update["professional.yearsOfExperience"] = dto.yearsOfExperience;
    }

    if (
      dto.degree !== undefined &&
      dto.university !== undefined &&
      dto.yearOfCompletion !== undefined
    ) {
      update["professional.education"] = [
        {
          degree: dto.degree,
          university: dto.university,
          yearOfCompletion: dto.yearOfCompletion,
        },
      ];
    }

    return update;
  };

  static toVerificationProofs = (doctor: IDoctor): VerificationProofsDto => {
    return {
      identityProof: doctor.professional.documents.identityProof,
      medicalRegistration: doctor.professional.documents.medicalRegistration,
      establishmentProof: doctor.professional.documents.establishmentProof,
    };
  };

  static toUpdateVerificationProofs = (
    proofs: VerificationProofsDto
  ): Partial<Pick<IDoctor, "professional">> & { [key: string]: IDocument } => {
    const update: { [key: string]: IDocument } = {};
    update[`professional.documents`] = proofs;
    return update;
  };
}
