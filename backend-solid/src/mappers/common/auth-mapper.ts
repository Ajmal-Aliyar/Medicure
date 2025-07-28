import { IAuthResponseUser, IRegisteredUserWithPersonal } from "@/interfaces";
import { IDoctor, IPatient } from "@/models";
import { IAdmin } from "@/models/interfaces/admin";

export class AuthMapper {
  static toUserDto(
    user: Partial<IDoctor> | Partial<IPatient> | Partial<IAdmin>,
    role: "patient" | "doctor" | "admin"
  ): IAuthResponseUser {
    const id = user._id?.toString() ?? "";
    const email = user.personal?.email ?? "";
    const fullName = user.personal?.fullName ?? "";
    const profileImage = user.personal?.profileImage ?? null;

    let isBlocked = false;
    let isApproved: "pending" | "applied" | "approved" | "rejected" = "approved";

    if (role === "doctor") {
      const doctor = user as Partial<IDoctor>;
      isBlocked = !!doctor.status?.accountStatus?.isBlocked;
      isApproved = doctor.status?.profile?.reviewStatus ?? "pending";
    }

    if (role === "patient") {
      const patient = user as Partial<IPatient>;
      isBlocked = !!patient.status?.isBlocked;
    }

    if (role === "admin") {
      isBlocked = false;
    }

    return {
      id,
      email,
      fullName,
      profileImage,
      role,
      isBlocked,
      isApproved,
    };
  }
}


