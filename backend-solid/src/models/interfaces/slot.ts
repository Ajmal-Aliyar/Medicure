import { Document, Types } from "mongoose";

export interface ISlot extends Document {
  doctorId: Types.ObjectId;
  startTime: string;
  endTime: string;
  date: string;
  type:  "consult" | "emergency";
  duration: number;
  fees: number;
  status:"available" | "booked" | "cancelled" | "completed";
  isActive: boolean;
  bookingDetails?: {
    isBooked: boolean;
    patientId?: Types.ObjectId;
    bookedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}