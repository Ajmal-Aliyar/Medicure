import { Types, Document } from "mongoose";

export interface IMedication {
  medicineId: string;
  medicineName: string;
  dosage: string; 
  frequency: string;
  duration: string;
  instructions: string; 
  quantity: number; 
  refills: number;
}

export interface IPrescription extends Document {
  prescriptionNumber: string;
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  appointmentId?: Types.ObjectId; 

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



// export interface IMedication {
//   medicineId: Types.ObjectId;
//   medicineName: string;
//   dosage: string; // e.g., "500mg", "10ml"
//   frequency: string; // e.g., "Twice daily", "3 times a day"
//   duration: string; // e.g., "7 days", "2 weeks"
//   instructions: string; // e.g., "Take after meals", "Take on empty stomach"
//   quantity: number; // Total quantity prescribed
//   refills: number; // Number of refills allowed
// }