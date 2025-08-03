import type { DoctorCardDetails, PatientCardDetails } from "./card";

export interface IFeedback {
  doctorId: string;
  patientId: string;
  appointmentId: string;
  rating: number;                                
  comment: string;           
  createdAt: Date;
}

export interface FeedbackDetails {
  id: string;
 rating: number;
  comment: string;
  appointmentId: string;
  createdAt: Date;
  doctor: DoctorCardDetails;
  patient: PatientCardDetails;
}
