import { Document } from "mongoose";
import { IPatientAddress } from "../../types/IPatientInterface";

export interface IPatient extends Document{
    profileImage: string;
    fullName: string;
    phone: number;
    email: string;
    password: string;
    dob: string;
    bloodGroup: string;
    gender: 'Male' | 'Female';
    address: IPatientAddress
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

