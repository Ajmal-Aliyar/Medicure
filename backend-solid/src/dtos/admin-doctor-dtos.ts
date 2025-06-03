import { IDoctor } from "@/models";

export interface DoctorApprovalRequestDto {
  id: string;
  fullName: string;
  profileImage: string | null;
  specialization: string;
}

type PersonalSafe = Omit<IDoctor["personal"], "password">;

export interface DoctorApprovalDetailsDto {
  id: string;
  personal: PersonalSafe;
  professional: IDoctor["professional"];
  location: IDoctor["location"];
  status: IDoctor["status"];
}

export interface ApprovedDoctorsDto {
  id: string;
  fullName: string;
  profileImage: string | null;
  specialization: string;
  fees: { amount: number; currency: string; };
  rating: {
    average: number,
    reviewCount: number
  }
}