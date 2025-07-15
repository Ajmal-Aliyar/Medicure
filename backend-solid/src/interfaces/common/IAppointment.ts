import { Types } from "mongoose";
import { DoctorCardDetails, PatientCardDetails } from "./card-details";
import { IGender } from "./IGender";
import { BloodGroup } from "./IBloodGroup";
import { IAppointmentStatus, IAppointmentType } from "@/types";
import { IMedication, TransactionStatus, TransactionType } from "@/models";


export interface IAppointmentCreateInput {
  doctorId: string;
  patientId: string;
  slotId: string;
  status: "scheduled";
  transactionId: string;
}

export interface AppointmentCard {
  id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctor: AppointmentUserInfo;
  patient: AppointmentUserInfo;
  roomId: string;
}

interface AppointmentUserInfo {
  id: string;
  name: string;
  profileImage: string;
  specialization?: string;
  age?: number;
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


export interface AppointmentDetailsPopulated {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctor: DoctorCardDetails;
  patient: PatientCardDetails;
  roomId: string;
  transactionId: string;
  feedbackId: string | null;
}



export type AppointmentPageDetails = {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus; 
  appointmentType: IAppointmentType; 
  roomId: string;
  createdAt: Date;

  doctor: DoctorCardDetails;
  patient: PatientCardDetails;

  transaction: {
    transactionId: string;
    amount: number;
    status: TransactionStatus;
    type: TransactionType;
    createdAt: Date;
  };

  prescription?: {
    id: string;
    prescriptionNumber: string;
    diagnosis: string[];
    symptoms: string[];
    medications: IMedication[];
    notes?: string;
    issuedDate: Date;
    validUntil: Date;
    followUpRequired: boolean;
    followUpDate: Date | null;
    allergies: string[];
  };
};
