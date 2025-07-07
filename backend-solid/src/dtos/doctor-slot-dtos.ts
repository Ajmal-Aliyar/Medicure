import { ISlot } from "@/models";
import { Types } from "mongoose";

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
    type:  "consult" | "emergency";
    duration: number;
    fees: number;
    status:"available" | "reserved" | "booked" | "cancelled" | "completed";
    isActive: boolean;
}