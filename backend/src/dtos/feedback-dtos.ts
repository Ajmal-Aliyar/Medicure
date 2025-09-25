import { Types } from "mongoose";
import { DoctorCardDetailsDTO } from "./doctor-dtos";
import { PatientCardDetailsDTO } from "./patient-dtos";

export interface SubmitFeedbackDTO {
  rating: number;
  comment?: string;
}

export interface FeedbackDTO {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  rating: number;                                
  comment: string;           
}


export interface FeedbackDetailsDTO {
  id: string;
 rating: number;
  comment: string;
  appointmentId: string;
  createdAt: Date;
 
  doctor?: DoctorCardDetailsDTO;
  patient?: PatientCardDetailsDTO;
}