import {
  ApprovedDoctorsDto,
  DoctorApprovalDetailsDto,
  DoctorApprovalRequestDto,
  DoctorMappedProfileDto,
  FilterDoctorRepoResponse,
} from "@/dtos";
import { IDoctor } from "@/models";

export class AdminDoctorMapper {
  static toDoctorApprovalSummaryDto(doctor: IDoctor): DoctorApprovalRequestDto {
    return {
      id: doctor._id.toString(),
      fullName: doctor.personal.fullName,
      profileImage: doctor.personal.profileImage,
      specialization: doctor.professional.specialization,
    };
  }

  static toDoctorApprovedSummaryDto(doctor: IDoctor): ApprovedDoctorsDto {
    return {
      id: doctor._id.toString(),
      fullName: doctor.personal.fullName,
      profileImage: doctor.personal.profileImage,
      specialization: doctor.professional.specialization,
      rating: doctor.rating,
      fees: doctor.professional.fees,
    };
  }

  static toDoctorApprovalDetailsDto(doctor: IDoctor): DoctorApprovalDetailsDto {
    const { _id, personal, professional, location, status } = doctor;
    const { password, ...personalSafe } = personal;

    return {
      id: String(_id),
      personal: personalSafe,
      professional,
      location,
      status,
    };
  }


  static toMapDoctorWithDefaults = (doctor: IDoctor): DoctorMappedProfileDto => {
    if (!doctor) throw new Error("Invalid doctor object");

    return {
      profile: {
        fullName: doctor.personal?.fullName ?? "",
        email: doctor.personal?.email ?? "",
        mobile: doctor.personal?.mobile ?? "",
        gender: doctor?.personal?.gender ?? null,
        dob: doctor.personal?.dob ?? null,
        profileImage: doctor.personal?.profileImage ?? null,
        languageSpoken: doctor.personal?.languageSpoken ?? [],
        specialization: doctor.professional?.specialization ?? null,
        headline: doctor.professional?.headline ?? null,
        about: doctor.professional?.about ?? null,
        yearsOfExperience: doctor.professional?.yearsOfExperience ?? 0,
        education: doctor.professional?.education ?? [],
        experience: doctor.professional?.experience ?? [],
        fees: {
          amount: doctor.professional?.fees?.amount ?? null,
          currency: doctor.professional?.fees?.currency ?? "INR",
        },
        rating: {
          average: doctor.rating?.average ?? null,
          reviewCount: doctor.rating?.reviewCount ?? 0,
        },
      },

      documents: {
        identityProof: doctor.professional?.documents?.identityProof ?? null,
        medicalRegistration:
          doctor.professional?.documents?.medicalRegistration ?? null,
        establishmentProof:
          doctor.professional?.documents?.establishmentProof ?? null,
      },

      registration: {
        registrationNumber: doctor.professional?.registrationNumber ?? null,
        registrationCouncil: doctor.professional?.registrationCouncil ?? null,
        registrationYear: doctor.professional?.registrationYear ?? null,
      },

      location: {
        street: doctor.location?.street ?? null,
        city: doctor.location?.city ?? null,
        state: doctor.location?.state ?? null,
        country: doctor.location?.country ?? null,
        pincode: doctor.location?.pincode ?? null,
      },

      status: {
        isBlocked: doctor.status?.accountStatus?.isBlocked ?? false,
        isApproved: doctor.status?.profile?.isApproved ?? false,
        profileStatus: doctor.status?.profile?.reviewStatus ?? "pending",
        isVerified: doctor.status?.verification?.isVerified ?? false,
      },

      id: doctor._id.toString(),
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  };
}
