import { IAppointmentStatus, IAppointmentType } from "@/types";
import { DoctorCardDetailsDTO } from "./doctor-dtos";
import { PatientCardDetailsDTO } from "./patient-dtos";
import { Types } from "mongoose";
import { IMedication, TransactionStatus, TransactionType } from "@/models";
import { IConnectionStatus } from "@/interfaces";

export interface AppointmentDetailsPopulatedDTO {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctor: DoctorCardDetailsDTO;
  patient: PatientCardDetailsDTO;
  roomId: string;
  transactionId: string;
  feedbackId: string | null;
}

interface AppointmentUserInfo {
  id: string;
  name: string;
  profileImage: string;
  specialization?: string;
  age?: number;
}

export interface AppointmentCardDTO {
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


export type AppointmentPageDetailsDTO = {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus; 
  appointmentType: IAppointmentType; 
  roomId: string;
  createdAt: Date;

  connectionStatus: IConnectionStatus;

  doctor: DoctorCardDetailsDTO;
  patient: PatientCardDetailsDTO;

  transaction: {
    transactionId: string;
    amount: number;
    status: TransactionStatus;
    type: TransactionType;
    createdAt: Date;
  };

  prescription?: {
    id: string;
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