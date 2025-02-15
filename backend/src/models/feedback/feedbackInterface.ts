import { Document } from "mongoose";

export interface IFeedback extends Document {
    patientId: string;      
    doctorId: string; 
    rating: number; 
    comments: string;    
}