import {
  DoctorProfileDTO,
  DoctorProfileUpdateDTO,
  ProfessionalVerificationDTO,
  VerificationProofsDTO,
} from "@/dtos";
import { IDocument, IEducation } from "@/interfaces";
import { IDoctor } from "@/models";

export class DoctorProfileMapper {
  static toDoctor = (doctor: IDoctor): DoctorProfileDTO => {
    return {
      id: doctor.id || "",
      fullName: doctor.personal.fullName || "",
      headline: doctor.professional.headline || "",
      about: doctor.professional.about || "",
      profileImage: doctor.personal.profileImage || "",
      dob: doctor.personal.dob ? doctor.personal.dob : "",
      email: doctor.personal.email || "",
      registrationNumber: doctor.professional.registrationNumber || "",
      gender: doctor.personal.gender || "",
      mobile: doctor.personal.mobile || "",
      specialization: doctor.professional.specialization || "",
      languageSpoken: doctor.personal.languageSpoken || [],
      experience: doctor.professional.yearsOfExperience || 0,
      experiences: doctor.professional.experience || [],
      educations: doctor.professional.education || [],
      address: {
        street: doctor.location.street || "",
        city: doctor.location.city || "",
        state: doctor.location.state || "",
        country: doctor.location.country || "",
        pincode: doctor.location.pincode || "",
      },
      rating: doctor.rating
    };
  };

  static toDoctorUpdate = (dto: DoctorProfileUpdateDTO): Partial<IDoctor> => {
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
    if (dto.mobile !== undefined) personalUpdates["personal.mobile"] = dto.mobile;

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
  const firstEducation = professional.education?.[0];

    return {
      registrationNumber: professional.registrationNumber,
      registrationCouncil: professional.registrationCouncil,
      registrationYear: professional.registrationYear,
      yearsOfExperience: professional.yearsOfExperience,
     ...(firstEducation && {
      degree: firstEducation.degree,
      university: firstEducation.university,
      yearOfCompletion: firstEducation.yearOfCompletion,
    }),
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

  static toVerificationProofs = (doctor: IDoctor): VerificationProofsDTO => {
    return {
      identityProof: doctor.professional.documents.identityProof,
      medicalRegistration: doctor.professional.documents.medicalRegistration,
      establishmentProof: doctor.professional.documents.establishmentProof,
    };
  };

  static toUpdateVerificationProofs = (
  proofs: VerificationProofsDTO
): Partial<Pick<IDoctor, "professional">> & { [key: string]: IDocument } => {
  const filteredProofs = Object.fromEntries(
    Object.entries(proofs).filter(([_, value]) => value != null)
  ) as VerificationProofsDTO;
  const update: { [key: string]: IDocument } = {};
  update["professional.documents"] = filteredProofs;
  return update;
};

}
