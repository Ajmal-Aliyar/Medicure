import { SpecializationPublicDetails } from "@/repositories";

export interface IPatientSpecializationService {
    getPublicSpecializationDetails(): Promise<SpecializationPublicDetails[]>
}