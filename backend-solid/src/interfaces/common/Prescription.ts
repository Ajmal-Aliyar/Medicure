import { IMedication } from "@/models";

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