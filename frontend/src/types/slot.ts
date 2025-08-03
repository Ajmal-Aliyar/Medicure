export type ISlotStatus = "available" | "reserved" | "booked" | "cancelled" | "completed";
export type ISlotType = "consult" | "emergency";


export interface ISlot {
  id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: ISlotType;
  duration: number;
  fees: number;
  status: ISlotStatus;
  isActive: boolean;
  bookingDetails?: {
    isBooked: boolean;
    patientId?: string;
    bookedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlotDetails {
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
    patientId?: string;
    bookedAt?: Date;
  };
}

export interface SlotChartData {date: string, totalSlots: number, bookedSlots: number}