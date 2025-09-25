import { Types } from "mongoose";
import { IGender } from "./IGender";
import { BloodGroup } from "./IBloodGroup";


export interface PopulatedFeedbackDetails {
  _id: Types.ObjectId;
  rating: number;
  comment: string;
  
  appointmentId: Types.ObjectId;
  doctorId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
      languageSpoken: string[];
      gender: IGender;
    };
    professional: {
      yearsOfExperience: number;
      specialization: string;
    };
    rating: {
      average: number;
      reviewCount: number;
    };
  };
  patientId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
      dob?: string;
      age?: string;
      mobile: string;
      gender?: IGender;
      bloodGroup: BloodGroup;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}


