import mongoose from 'mongoose';
import { IDoctor } from './doctorInterface';
import { DoctorSchema } from './doctorSchema';

export const DoctorModel = mongoose.model<IDoctor>('Doctor', DoctorSchema);
