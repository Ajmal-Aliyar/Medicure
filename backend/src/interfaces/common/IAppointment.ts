import { Types } from "mongoose";
import { IGender } from "./IGender";
import { BloodGroup } from "./IBloodGroup";
import { IAppointmentStatus, IAppointmentType } from "@/types";


export interface IAppointmentCreateInput {
  doctorId: string;
  patientId: string;
  slotId: string;
  status: "scheduled";
  transactionId: string;
}




export interface PopulatedAppointment {
  _id: Types.ObjectId;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctorId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
    };
    professional: {
      specialization?: string;
    };
  };
  patientId: {
    _id: Types.ObjectId;
    personal: {
        fullName: string;
        profileImage: string;
        age?: number;
    }
  };
  feedbackId: string | null;
  prescriptionId: string | null;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedAppointmentForRoom {
  _id: Types.ObjectId;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctorId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
      languageSpoken: string[];
      gender: IGender
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
      mobile: string;
      gender?: IGender;
      bloodGroup: BloodGroup;
    };
  };
  feedbackId: string | null;
  transactionId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}



export type IConnectionStatus = "not_connected" | "request_sent" | "connected";

