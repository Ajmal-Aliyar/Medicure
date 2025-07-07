import { FilterDoctorRepoResponse, PublicDoctorDetails } from "@/dtos";
import { IDoctor } from "@/models";

export class DoctorMapper {
  static toFullDoctorProfileDto(doctor: IDoctor) {
    if (!doctor) return null;
    const { personal, ...rest } = doctor;
    const { password, ...personalSafe } = personal;

    return {
      personal: personalSafe,
      ...rest,
    };
  }

  static toDoctorCardDto(
  doctors: Partial<FilterDoctorRepoResponse>[],
  isAdmin: boolean
): PublicDoctorDetails[] {
  return doctors.map((doctor) => ({
    id: doctor._id?.toString() || "",

    fullName: doctor.personal?.fullName || "",
    dob: doctor.personal?.dob || null,
    profileImage: doctor.personal?.profileImage || null,
    languageSpoken: doctor.personal?.languageSpoken || null,

    experience: doctor.professional?.yearsOfExperience ?? null,
    specialization: doctor.professional?.specialization ?? null,

    verificationStatus: doctor.status?.verification?.isVerified ?? false,

    rating: {
      average: doctor.rating?.average ?? 0,
      reviewCount: doctor.rating?.reviewCount ?? 0,
    },

    ...(isAdmin && {
      profileStatus: doctor.status?.profile?.reviewStatus || "pending",
      accountStatus: doctor.status?.accountStatus?.isBlocked ?? false,
    }),
  }));
}

}
