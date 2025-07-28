import { Types, Document } from "mongoose";

export interface IMedication {
  medicineName: string;
  dosage: string; 
  frequency: string;
  duration: string;
  instructions: string; 
  quantity: number; 
  refills: number;
}

export interface IPrescription extends Document {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  appointmentId: Types.ObjectId; 

  medications: IMedication[];
  diagnosis: string[];
  symptoms: string[];
  notes?: string;
  
  issuedDate: Date;
  validUntil: Date;
  
  followUpRequired: boolean;
  followUpDate?: Date;
  allergies?: string[]; 
  
  createdAt: Date;
  updatedAt: Date;
}

