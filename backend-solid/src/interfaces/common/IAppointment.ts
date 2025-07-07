export interface IAppointmentCreateInput {
  doctorId: string;
  patientId: string;
  slotId: string;
  status: "scheduled";
  transactionId: string;
}

export interface AppointmentCard {
  id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status:
    | "scheduled"
    | "confirmed"
    | "in progress"
    | "completed"
    | "cancelled"
    | "no show";
  appointmentType: "consult" | "follow-up" | "emergency";
  doctor: AppointmentUserInfo;
  patient: AppointmentUserInfo;
}

interface AppointmentUserInfo {
  id: string;
  name: string;
  profileImage: string;
  specialization?: string;
  age?: number;
}

import { Types } from "mongoose";

export interface PopulatedAppointment {
  _id: Types.ObjectId;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status:
    | "scheduled"
    | "confirmed"
    | "in progress"
    | "completed"
    | "cancelled"
    | "no show";
  appointmentType: "consult" | "follow-up" | "emergency";
  doctorId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
    };
    professional: {
      specialization?: string;
    };
  };
  patientId: {
    _id: Types.ObjectId;
    personal: {
        fullName: string;
        profileImage: string;
        age?: number;
    }
  };
  createdAt: Date;
  updatedAt: Date;
}
