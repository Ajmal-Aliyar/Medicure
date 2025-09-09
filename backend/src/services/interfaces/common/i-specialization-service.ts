import { ISpecialization } from "@/models";
import { SpecializationPublicDetails } from "@/repositories";

export interface ISpecializationService {
    getPublicSpecialization(): Promise<SpecializationPublicDetails[]>
    getSpecializationDetails(specialization: string): Promise<ISpecialization>
}