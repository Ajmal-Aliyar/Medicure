import { Document, Types } from "mongoose";

export type IAppointmentStatus = "scheduled" | "in progress" | "completed" | "cancelled" | "no show"
export type IAppointmentType = "consult" | "follow-up" | "emergency";
export interface IAppointment extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  slotId: Types.ObjectId;
  roomId: string;
  appointmentDate: Date;
  startTime: string; 
  endTime: string;   
  status: IAppointmentStatus;
  appointmentType: "consult" | "follow-up" | "emergency";
  transactionId: string;
  recordId: Types.ObjectId | null;
  
  notes?: string;          
  cancelReason?: string;   
  
  createdAt: Date;
  updatedAt: Date;
}