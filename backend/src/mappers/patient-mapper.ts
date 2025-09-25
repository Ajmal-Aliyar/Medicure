import { PatientProfileDTO } from "@/dtos";
import { PatientCardDetails } from "@/interfaces/common/card-details";
import { IPatient } from "@/models";

export class PatientMapper {
  static toPatientCardDto(data: IPatient[]): PatientCardDetails[] {
    return data.map((patient: IPatient) => ({
      bloodGroup: patient.personal.bloodGroup || null,
      dob: patient.personal.dob || "",
      mobile: patient.personal.mobile,
      id: String(patient._id),
      fullName: patient.personal.fullName,
      gender: patient.personal.gender || null,
      profileImage: patient.personal.profileImage,
      accountStatus: patient.status.isBlocked,
    }));
  }

  static toPatientProfile(data: IPatient): PatientProfileDTO {
    return {
      id: String(data._id),

      personal: {
        profileImage: data.personal.profileImage || null,
        fullName: data.personal.fullName,
        mobile: data.personal.mobile,
        email: data.personal.email,
        gender: data.personal.gender,
        dob: data.personal.dob,
        bloodGroup: data.personal.bloodGroup,
      },

      contact: {
        address: data.contact.address
    },

      status: {
        isBlocked: data.status.isBlocked,
      },

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
