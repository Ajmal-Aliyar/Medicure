import { IAppointmentStatus, IAppointmentType } from "@/types";
import { Document, Types } from "mongoose";

export interface IAppointment extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  slotId: Types.ObjectId;
  roomId: string;
  appointmentDate: Date;
  startTime: string; 
  endTime: string;   
  status: IAppointmentStatus;
  appointmentType: IAppointmentType;
  transactionId: string;
  recordId: Types.ObjectId | null;
  feedbackId: Types.ObjectId | null;
  notes?: string;          
  cancelReason?: string;   
  
  createdAt: Date;
  updatedAt: Date;
}