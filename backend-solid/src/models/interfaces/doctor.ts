import {
  IAddress,
  IDocument,
  IEducation,
  IExperience,
  IGender,
  IWeekDay,
} from "@/interfaces";
import { Document, Types } from "mongoose";

export interface IDoctor extends Document {
  _id: Types.ObjectId;

  personal: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    gender: IGender;
    dob: string;
    profileImage: string | null;
    languageSpoken: string[];
  };

  professional: {
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    specialization: string;
    headline: string;
    about: string;
    yearsOfExperience: number;
    education: IEducation[];
    experience: IExperience[];
    fees: {
      amount: number;
      currency: string;
    };
    documents: IDocument;
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
    accountStatus: {
      isBlocked: boolean;
      reason: string | null;
    };
    profile: {
      isApproved: boolean;
      reviewStatus: "pending" | "applied" | "approved" | "rejected";
      reviewComment: string | null;
    };
    verification: {
      isVerified: boolean;
      verifiedAt: Date;
    };
  };
}
