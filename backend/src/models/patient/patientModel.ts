import { model } from "mongoose";
import { PatientSchema } from "./patientSchema";


export const PatientModel = model('Patient', PatientSchema);

