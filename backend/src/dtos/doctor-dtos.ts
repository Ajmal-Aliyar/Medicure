import { IDoctor } from "@/models";
import { Types } from "mongoose";
import { IAddress, IEducation, IExperience, IGender } from "@/interfaces";
import { CardDetails } from "@/interfaces/common/card-details";

export interface PublicDoctorDetailsDTO {
  id: string;
  fullName: string;
  gender: string;
  dob: string | null;
  profileImage: string | null;
  languageSpoken: string[] | null;
  specialization: string | null;
  experience: number | null;
  verificationStatus: boolean
  profileStatus?: string;
  accountStatus?: boolean;
  rating: {
    average: number;
    reviewCount: number;
  };
}


export interface DoctorApprovalRequestDTO {
  id: string;
  fullName: string;
  profileImage: string | null;
  specialization: string;
}

type PersonalSafe = Omit<IDoctor["personal"], "password">;

export interface DoctorApprovalDetailsDTO {
  id: string;
  personal: PersonalSafe;
  professional: IDoctor["professional"];
  location: IDoctor["location"];
  status: IDoctor["status"];
}

export interface ApprovedDoctorsDTO {
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

export interface FilterDoctorRepoResponseDTO {
  _id: Types.ObjectId;
  rating?: {
    average?: number;
    reviewCount?: number;
  };
  personal: {
    fullName: string;
    profileImage: string | null;
    dob?: string;
    languageSpoken?: string[];
    gender: string
  };
  professional?: {
    yearsOfExperience?: number;
    specialization?: string;
  };
  status: {
    profile: { reviewStatus: string };
    accountStatus: { isBlocked: boolean };
    verification: { isVerified: boolean };
  };
}

export interface DoctorMappedProfileDto {
  profile: {
    fullName: string;
    email: string;
    mobile: string;
    gender: "Male" | "Female" | "Other" | null;
    dob: string | null;
    profileImage: string | null;
    languageSpoken: string[];
    specialization: string | null;
    headline: string | null;
    about: string | null;
    yearsOfExperience: number;
    education: {
      degree: string;
      university: string;
      yearOfCompletion: number;
    }[];
    experience: {
      hospitalName: string;
      role: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }[];
    fees: {
      amount: number | null;
      currency: string;
    };
    rating: {
      average: number | null;
      reviewCount: number;
    };
  };

  documents: {
    identityProof: string | null;
    medicalRegistration: string | null;
    establishmentProof: string | null;
  };

  registration: {
    registrationNumber: string | null;
    registrationCouncil: string | null;
    registrationYear: number | null;
  };

  location: {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
  };

  status: {
    isBlocked: boolean;
    isApproved: boolean;
    profileStatus: "pending" | "applied" | "approved" | "rejected";
    isVerified: boolean;
  };

  id: string;
  createdAt: Date;
  updatedAt: Date;
};


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

export interface DoctorProfileDTO {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  registrationNumber: string
  headline: string;
  about: string;
  dob: string;
  gender: IGender;
  mobile: string;
  specialization: string;
  languageSpoken: string[];
  address: IAddress
  rating: {
    average: number,
    reviewCount: number
  };
  experience: number;
  educations: IEducation[];
  experiences: IExperience[];
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

export interface VerificationProofsDTO {
  identityProof: string;
  medicalRegistration: string;
  establishmentProof: string;
}


export interface DoctorCardDetailsDTO extends CardDetails {
  languageSpoken: string[];
  specialization: string;
  experience: number;
  rating: {
    average: number;
    reviewCount: number;
  } | null;
}