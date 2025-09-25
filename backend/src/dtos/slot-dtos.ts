import { ISlot } from "@/models";
import { Types } from "mongoose";

export type ISlotStatus = "available" | "reserved" | "booked" | "cancelled" | "completed";
export type ISlotType = "consult" | "emergency";

export type SlotTimeCategory =
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night'
  | 'lateNight';

export type CategorizedSlots = Record<SlotTimeCategory, ISlot[]>;


export interface PublicSlotDetailsDTO {
    id: string;
    doctorId: Types.ObjectId;
    startTime: string;
    endTime: string;
    date: Date;
    type:  ISlotType;
    duration: number;
    fees: number;
    status: ISlotStatus
    isActive: boolean;
}

export interface ISlotDetailsDTO {
  id: string
  doctorId: string;
  date: Date;
  type:  ISlotType
  status: ISlotStatus;
  
  startTime: string;
  endTime: string;
  duration: number;
  fees: number;

  isActive?: boolean;
  bookingDetails?: {
    isBooked: boolean;
    patientId?: Types.ObjectId;
    bookedAt?: Date;
  };
}

export interface SlotDTO {
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
