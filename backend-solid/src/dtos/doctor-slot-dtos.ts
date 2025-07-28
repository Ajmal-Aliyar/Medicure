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


export interface PublicSlotDetails {
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

