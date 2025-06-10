import { Document, Types } from "mongoose";

export interface IAppointment extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  slotId: Types.ObjectId;
  roomId: string;
  appointmentDate: Date;
  startTime: string; 
  endTime: string;   
  status: "Scheduled" | "Confirmed" | "In Progress" | "Completed" | "Cancelled" | "No Show";
  appointmentType: "Consultation" | "Follow-up" | "Emergency";
  transactionId: string;
  recordId: Types.ObjectId;
  
  notes?: string;          
  cancelReason?: string;   
  
  createdAt: Date;
  updatedAt: Date;
}