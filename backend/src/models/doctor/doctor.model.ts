import mongoose from 'mongoose';
import { IDoctor } from './doctor.interface';
import { DoctorSchema } from './doctor.schema';

export const DoctorModel = mongoose.model<IDoctor>('Doctor', DoctorSchema);
