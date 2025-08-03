import { IDoctor } from "@/models";
import { Types } from "mongoose";

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

export interface FilterDoctorRepoResponse {
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
