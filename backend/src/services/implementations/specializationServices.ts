import { ISpecializationRepository } from "../../repositories/interfaces/ISpecializationRepository";
import { ISpecializationServices } from "../interfaces/ISpecializationServices";







class SpecializationServices implements ISpecializationServices {
    private specializationRepository: ISpecializationRepository;

    constructor(specializationRepository: ISpecializationRepository) {
        this.specializationRepository = specializationRepository
    }

    async createSpecialization({ name, image}:{name: string, image: string}): Promise<void> {
        try {
            await this.specializationRepository.createSpecialization( name, image);

        } catch (error: any) {
            throw(error)
        }

    }

}