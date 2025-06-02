import { IAuthResponseUser, IRegisteredUserWithPersonal } from "@/interfaces";
import { IDoctor, IPatient } from "@/models";
import { IAdmin } from "@/models/interfaces/admin";

export const mapToUserDto = (
  user: Partial<IDoctor> | Partial<IPatient> | Partial<IAdmin>,
  role: 'patient' | 'doctor' | 'admin'
): IAuthResponseUser => {
  const safeUser = user as IRegisteredUserWithPersonal;
  let isApproved: "pending" | "applied" | "approved" | "rejected" = 'approved';
  if (role === 'doctor') isApproved = safeUser.status.profile.reviewStatus
  return {
    id: safeUser._id.toString(),
    email: safeUser.personal.email,
    fullName: safeUser.personal.fullName,
    isApproved,
    profileImage: safeUser.personal.profileImage,
    role,
  };
}