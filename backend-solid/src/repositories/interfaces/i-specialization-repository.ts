import { ISpecialization } from "@/models";
import { IBaseRepository } from "./i-base-repository";

export interface ISpecializationRepository extends IBaseRepository<ISpecialization> {
    getPublicDetails(): Promise<SpecializationPublicDetails[]>
}

export interface SpecializationPublicDetails {
    _id: string;
    name: string;
    imageUrl: string;
}