import { Document, Types } from "mongoose";

export interface ISlot extends Document {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId;
  startTime: string;
  endTime: string;
  date: Date;
  type:  "consult" | "emergency";
  duration: number;
  fees: number;
  status:"available" | "reserved" | "booked" | "cancelled" | "completed";
  isActive: boolean;
  bookingDetails?: {
    isBooked: boolean;
    patientId?: Types.ObjectId;
    bookedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}