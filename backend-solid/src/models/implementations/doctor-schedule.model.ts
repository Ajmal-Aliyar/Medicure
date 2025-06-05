import { Schema, model } from "mongoose";
import { IDoctorSchedule } from "../interfaces";

const ShiftSchema = new Schema({
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },   
  type: { type: String, enum: ['consult', 'emergency'], default: 'consult' },
  duration: { type: Number, required: true },  
  fees: { type: Number, required: true },
  buffer: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const WeeklyScheduleSchema = new Schema({
  monday: { shifts: [ShiftSchema] },
  tuesday: { shifts: [ShiftSchema] },
  wednesday: { shifts: [ShiftSchema] },
  thursday: { shifts: [ShiftSchema] },
  friday: { shifts: [ShiftSchema] },
  saturday: { shifts: [ShiftSchema] },
  sunday: { shifts: [ShiftSchema] }
}, { _id: false });

const DoctorScheduleSchema = new Schema<IDoctorSchedule>({
  doctorId: { type: String, ref: "Doctor", required: true, unique: true },
  weeklySchedule: { type: WeeklyScheduleSchema, required: true },

  autoApprove: { type: Boolean, default: false },
  advanceBooking: { type: Number, default: 7 },
  timezone: { type: String, default: "Asia/Kolkata" },

  lastUpdated: { type: Date, default: Date.now },
  version: { type: Number, default: 1 }
});

export const DoctorScheduleModel = model<IDoctorSchedule>(
  "DoctorSchedule",
  DoctorScheduleSchema
);
