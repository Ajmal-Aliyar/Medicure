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
}
