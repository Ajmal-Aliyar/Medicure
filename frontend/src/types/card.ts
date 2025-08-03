import type { IBloodGroup, IGender } from "./common";

export interface CardDetails {
  id: string;
  fullName: string;
  gender: IGender | null;
  profileImage: string | null;
}

export interface DoctorCardDetails extends CardDetails {
  languageSpoken: string[];
  specialization: string;
  experience: number;
  rating: {
    average: number;
    reviewCount: number;
  };
}

export interface PatientCardDetails extends CardDetails {
  dob: string | null;
  bloodGroup: IBloodGroup | null;
  mobile: string;
  accountStatus?: boolean
}
