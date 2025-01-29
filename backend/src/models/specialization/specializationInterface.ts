import { Document } from "mongoose";


export interface ISpecialization extends Document {
    name: string;
    image: string;
    description: string;
}
