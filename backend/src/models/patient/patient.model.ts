import { model } from "mongoose";
import { PatientSchema } from "./patient.schema";


export const PatientModel = model('Patient', PatientSchema);

