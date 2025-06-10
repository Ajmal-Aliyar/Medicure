import { ISlot } from "@/models";

export type SlotTimeCategory =
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night'
  | 'lateNight';

export type CategorizedSlots = Record<SlotTimeCategory, ISlot[]>;
