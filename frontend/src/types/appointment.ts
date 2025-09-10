import type { DoctorCardDetails, PatientCardDetails } from "./card";
import type { MetaType } from "./common";
import type { IFeedback } from "./feedback";
import type { IMedication } from "./prescription";
import type { TransactionStatus, TransactionType } from "./transaction";

export type IAppointmentStatus = "scheduled" | "in progress" | "completed" | "cancelled" | "no show"
export type IAppointmentType = "consult" | "follow-up" | "emergency";

export interface IAppointmentCard {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctor: AppointmentUserInfo;
  patient: AppointmentUserInfo;
  feedbackId: string | null;
  prescriptionId: string | null;
  roomId: string;
}

export interface AppointmentUserInfo {
  id: string;
  name: string;
  profileImage: string;
  specialization?: string; 
  age?: number;             
}

export interface AppointmentDetailsPopulated {
  id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  doctor: DoctorCardDetails;
  patient: PatientCardDetails;
  roomId: string;
  transactionId: string;
  createdAt: Date
}
export type IConnectionStatus = "not_connected" | "request_sent" | "connected";
export type AppointmentPageDetails = {
  id: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: IAppointmentStatus; 
  appointmentType: IAppointmentType; 
  roomId: string;
  createdAt: Date;
  connectionStatus: IConnectionStatus;

  patient: PatientCardDetails;
  doctor: DoctorCardDetails;

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


export interface IAppointmentService {
  getAllAppointments: (queryParams: URLSearchParams) => Promise<{ data: IAppointmentCard[]; meta: MetaType; }>;
  getAppointmentPageDetailsById: (appointmentId: string) => Promise<AppointmentPageDetails>;
  getFeedbackByAppointmentId(
      appointmentId: string
    ): Promise<IFeedback>;
}