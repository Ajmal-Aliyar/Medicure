import { IMedication } from "@/models";
import { Types } from "mongoose";

export interface FrontendPrescriptionPayload {
  doctorId: string;
  patientId: string;
  appointmentId: string;
  medications: IMedication[];
  diagnosis: string[];
  symptoms: string[];
  notes?: string;
  issuedDate: string | Date;
  validUntil: string | Date;
  followUpRequired: boolean;
  followUpDate?: string | Date;
  allergies?: string[];
}

export interface PrescriptionFullDetails {
  _id: Types.ObjectId | string;
  doctorId: {
    personal: {
      fullName: string;
      email: string;
      mobile?: string;
      gender?: string;
      profileImage?: string | null;
    };
    professional: {
      registrationNumber?: string;
      specialization?: string;
      headline?: string;
      yearsOfExperience?: number;
    };
    location?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      pincode?: string;
    };
  };
  patientId: {
    personal: {
      fullName: string;
      gender?: string;
      dob?: string;
      email?: string;
      mobile?: string;
      profileImage?: string | null;
      languageSpoken?: string[];
    };
    contact?: {
      address?: {
        addressLine?: string;
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
        geo?: {
          lat?: number;
          lng?: number;
        };
      };
    };
  };
  appointmentId: {
    appointmentDate: Date;
    appointmentTime: string;
    mode?: string;
    status?: string;
  };

  medications: {
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
    refills?: number;
  }[];

  diagnosis: string[];
  symptoms: string[];
  notes?: string;
  allergies?: string[];
  issuedDate: Date;
  validUntil: Date;
  followUpRequired: boolean;
  followUpDate?: Date;
}

export interface ViewPrescription {
  id: string;
  doctor: {
    personal: {
      fullName: string;
      email: string;
      mobile?: string;
      gender?: string;
      profileImage?: string | null;
    };
    professional: {
      registrationNumber?: string;
      specialization?: string;
      yearsOfExperience?: number;
    };
    location?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      pincode?: string;
    };
  };
  patient: {
    personal: {
      fullName: string;
      gender?: string;
      dob?: string;
      email?: string;
      mobile?: string;
      profileImage?: string | null;
      languageSpoken?: string[];
    };
    contact?: {
      address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
      };
    };
  };
  appointment?: {
    appointmentDate: Date;
    appointmentTime: string;
    mode?: string;
    status?: string;
  };

  medications: {
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
    refills?: number;
  }[];

  diagnosis: string[];
  symptoms: string[];
  notes: string;
  allergies: string[];
  issuedDate: Date;
  validUntil: Date;
  followUpRequired: boolean;
  followUpDate: Date | null;
}
