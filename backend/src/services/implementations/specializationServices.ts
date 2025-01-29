import { ISpecialization } from "../../models/specialization/specializationInterface";
import { ISpecializationRepository } from "../../repositories/interfaces/ISpecializationRepository";
import { ISpecializationServices } from "../interfaces/ISpecializationServices";







export class SpecializationServices implements ISpecializationServices {
    private specializationRepository: ISpecializationRepository;

    constructor(specializationRepository: ISpecializationRepository) {
        this.specializationRepository = specializationRepository
    }

    async createSpecialization({
        name,
        image,
        description
    }: {
        name: string;
        image: string;
        description: string;
    }): Promise<string> {
        try {
            const response = await this.specializationRepository.createSpecialization(name, image, description);
            if (response) {
                const message = `Specialization "${name}" created successfully.`;
                console.log(message);
                return message;
            }

            throw new Error("Failed to create the specialization.");
        } catch (error) {
            console.error("Error creating specialization:", error);
            throw (`Failed to create specialization: ${error.message}`)
        }
    }

    async fetchAllSpecialization(): Promise<ISpecialization[]> {
        try {
            return await this.specializationRepository.fetchAllSpecialization()
        } catch (error) {
            console.error("Error fetching specializations:", error);
            throw (`Failed to fetch specializations: ${error.message}`)
        }
    }

    async fetchByName(name:string): Promise<ISpecialization> {
        try {
            return await this.specializationRepository.fetchByName(name)
        } catch (error) {
            console.error("Error fetching specialization:", error);
            throw (`Failed to fetch specialization: ${error.message}`)
        }
    }


}