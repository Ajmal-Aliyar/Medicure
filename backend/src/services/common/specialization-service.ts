import { inject, injectable } from "inversify";
import { ISpecializationService } from "../interfaces";
import { TYPES } from "@/di/types";
import { ISpecializationRepository, SpecializationPublicDetails } from "@/repositories";
import { NotFoundError } from "@/errors";
import { ISpecialization } from "@/models";

@injectable()
export class SpecializationService implements ISpecializationService {
    constructor(@inject(TYPES.SpecializationRepository) private readonly _specializationRepo: ISpecializationRepository) {}

    async getPublicSpecialization(): Promise<SpecializationPublicDetails[]>  {
        return await this._specializationRepo.getPublicDetails()
    }

    async getSpecializationDetails(specialization: string): Promise<ISpecialization> {
        const details = await this._specializationRepo.findOne({ name: specialization});
        if (!details) {
            throw new NotFoundError("Specialization not found.")
        }
        return details
    }

}