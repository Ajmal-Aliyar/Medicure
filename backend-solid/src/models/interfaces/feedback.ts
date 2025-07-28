import { Document, Types } from "mongoose";

export interface IFeedback extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  rating: number;                                
  comment: string;           
  createdAt?: Date;
  updatedAt?: Date;
}