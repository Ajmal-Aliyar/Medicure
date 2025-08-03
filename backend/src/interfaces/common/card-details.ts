import { BloodGroup } from "./IBloodGroup";
import { IGender } from "./IGender";

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
  } | null;
}

export interface PatientCardDetails extends CardDetails {
  dob: string | null;
  bloodGroup: BloodGroup | null;
  mobile: string;
}
