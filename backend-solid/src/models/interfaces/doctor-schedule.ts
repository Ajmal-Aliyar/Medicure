import { Document } from "mongoose";

export type ShiftType = 'normal' | 'emergency';

export interface IShift {
    startTime: string;    
    endTime: string;     
    type: ShiftType;      
    duration: number;     
    fees: number;        
    buffer?: number;     
    isActive?: boolean;   
    }

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type IWeeklySchedule = {
  [key in Day]?: {
    shifts: IShift[];
  };
};

export interface IDoctorSchedule extends Document {
  doctorId: string;             
  weeklySchedule: IWeeklySchedule;
  autoApprove: boolean;
  advanceBooking: number;       
  timezone: string;           
  lastUpdated?: Date;
  version?: number;
  isActive?: boolean;          
}
