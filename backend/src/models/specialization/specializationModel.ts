import { model } from "mongoose";
import { ISpecialization } from "./specializationInterface";
import { SpecializationSchema } from "./specializationSchema";

export const SpecializationModal = model<ISpecialization>('specialization', SpecializationSchema);