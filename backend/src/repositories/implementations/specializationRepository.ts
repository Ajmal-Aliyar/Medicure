import { SpecializationModal } from "../../models/specialization/specializationModel";
import { ISpecializationRepository } from "../interfaces/ISpecializationRepository";


export class SpecializationRepository implements ISpecializationRepository {

    async createSpecialization(name: string, image: string): Promise<void> {
        try {
            const specialization = new SpecializationModal({ name, image })
            await specialization.save();
        } catch (error) {
            console.error("Error creating new specialization:", error);
            throw new Error("Unable to create new specialization");
        }
    }

}