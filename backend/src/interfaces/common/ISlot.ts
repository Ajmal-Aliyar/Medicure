
import { ISlotStatus, ISlotType } from "@/dtos";
import { Types } from "mongoose";

export interface ISlotCreateInput {
  doctorId: Types.ObjectId;
  startTime: string;
  endTime: string;
  date: Date;
  type:  "consult" | "emergency";
  duration: number;
  fees: number;
  status: "available" | "pending" | "booked";
  bookingDetails?: {
    isBooked: boolean;
    patientId?: Types.ObjectId;
    bookedAt?: Date;
  };
}


export interface SlotChartData {date: string, totalSlots: number, bookedSlots: number}