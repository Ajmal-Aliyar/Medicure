import { InferSchemaType } from "mongoose";
import { SpecializationSchema } from "../../models/specialization/specializationSchema";
import { ISpecialization } from "../../models/specialization/specializationInterface";

export type ISpecializationDocument = InferSchemaType<typeof SpecializationSchema>;

export interface ISpecializationRepository {
    createSpecialization(name: string, image: string, description: string): Promise<ISpecializationDocument>
    fetchAllSpecialization(): Promise<ISpecialization[]>
    fetchByName(name: string): Promise<ISpecialization>
}

