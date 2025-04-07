import { Document } from "mongoose";

export interface IFeedback extends Document {
    patientId: string;      
    doctorId: string; 
    appointmentId: string;
    rating: number; 
    comments: string;
    createdAt: Date    
}