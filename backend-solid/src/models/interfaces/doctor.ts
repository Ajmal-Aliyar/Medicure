import { IAddress, IEducation, IExperience, IGender, IWeekDay } from "@/interfaces";
import { Document, Types } from "mongoose";

export interface IDoctor extends Document {
  _id: Types.ObjectId;

  personal: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    gender: IGender
    dob: Date;
    profileImage: string | null;
    languageSpoken: string[];
  };

  professional: {
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    specialization: string[];
    headline?: string;
    about?: string;
    yearsOfExperience: number;
    educationDetails?: IEducation;
    education: IEducation[];
    experience: IExperience[];
    fees: {
      amount: number;
      currency: string;
    };
    documents: {
      identityProof: string;
      medicalRegistration: string;
      establishmentProof: string;
    };
  };

  availability: {
    days: IWeekDay[];
    timeSlots: {
      start: string;
      end: string;
    }[];
    timezone: string;
  };

  location: IAddress;

  rating: {
    average: number;
    reviewCount: number;
  };

  status: {
    isBlocked: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
    isVerified: boolean;
  };
}
