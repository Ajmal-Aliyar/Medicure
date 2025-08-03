import { Document } from "mongoose";

export interface ISpecialization extends Document {
  key: string;                   
  name: string;  
  imageUrl: string;               
  description: string;
  avgConsultTime: number;        
  bookings: number;             
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
