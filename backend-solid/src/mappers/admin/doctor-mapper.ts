import { ApprovedDoctorsDto, DoctorApprovalDetailsDto, DoctorApprovalRequestDto } from "@/dtos";
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
      fees: doctor.professional.fees
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
}
