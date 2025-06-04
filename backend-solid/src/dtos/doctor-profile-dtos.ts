export interface DoctorProfileUpdateDTO {
  fullName: string;
  headline: string;
  about: string;
  dob: string;
  gender: string;
  mobile: string;
  addressLine: string;
  street: string;
  specialization: string;
  languageSpoken: string[];
  city: string;
  state: string;
  country: string;
  pincode: string;
}

import { IAddress, IGender } from "@/interfaces";

export interface DoctorProfileDTO {
  fullName: string;
  profileImage: string;
  headline: string;
  about: string;
  dob: string;
  gender: IGender;
  mobile: string;
  specialization: string;
  languageSpoken: string[];
  address: IAddress
}

export interface ProfessionalVerificationDTO {
  registrationNumber: string;
  registrationCouncil: string;
  registrationYear: number;
  degree: string;
  university: string;
  yearOfCompletion: number;
  yearsOfExperience: number;
}

export interface VerificationProofsDto {
  identityProof: string;
  medicalRegistration: string;
  establishmentProof: string;
}
