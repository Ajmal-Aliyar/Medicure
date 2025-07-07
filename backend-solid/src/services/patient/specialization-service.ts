import { inject } from "inversify";
import { IPatientSpecializationService } from "../interfaces";
import { TYPES } from "@/di/types";
import { ISpecializationRepository, SpecializationPublicDetails } from "@/repositories";

export class PatientSpecializationService implements IPatientSpecializationService {
    constructor(@inject(TYPES.SpecializationRepository) private readonly specializationRepo: ISpecializationRepository) {}

    async getPublicSpecializationDetails(): Promise<SpecializationPublicDetails[]>  {
        return await this.specializationRepo.getPublicDetails()
    }

}