import { Document, Types } from "mongoose";

export interface ISlot extends Document {
  doctorId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  type: "in-person" | "video";
  duration: number;
  fees: number;
  status: "available" | "pending" | "booked";
  bookingDetails?: {
    isBooked: boolean;
    patientId?: Types.ObjectId;
    bookedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}