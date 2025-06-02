import { Document, Types } from 'mongoose';
import {  IAddress, IEmergencyContact, IGender } from '@/interfaces';


export interface IPatient extends Document {
  _id: Types.ObjectId;

  personal: {
    profileImage: string | null;
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    gender: IGender;
    dob: string;
    bloodGroup?: string;
    languageSpoken?: string[]; 
  };

  contact: {
    address: IAddress;
    emergencyContact?: IEmergencyContact;
  };

  status: {
    isBlocked: boolean;
    isVerified: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
  };

  meta: {
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
  };
}
