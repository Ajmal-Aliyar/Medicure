import { IAuthResponseUser, IRegisteredUserWithPersonal } from "@/interfaces";
import { IDoctor, IPatient } from "@/models";

export const mapToUserDto = (
  user: Partial<IDoctor> | Partial<IPatient>,
  role: 'patient' | 'doctor' | 'admin'
): IAuthResponseUser => {
  const safeUser = user as IRegisteredUserWithPersonal;
  return {
    id: safeUser._id.toString(),
    email: safeUser.personal.email,
    fullName: safeUser.personal.fullName,
    isApproved: safeUser.status.isApproved,
    profileImage: safeUser.personal.profileImage,
    role,
  };
}