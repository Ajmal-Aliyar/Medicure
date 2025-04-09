import { ISpecialization } from "../../models/specialization/specializationInterface";
import { SpecializationModal } from "../../models/specialization/specializationModel";
import {
  ISpecializationDocument,
  ISpecializationRepository,
} from "../interfaces/ISpecializationRepository";

export class SpecializationRepository implements ISpecializationRepository {
  async createSpecialization(
    name: string,
    image: string,
    description: string
  ): Promise<ISpecializationDocument> {
    try {
      const specialization = new SpecializationModal({
        name,
        image,
        description,
      });
      return await specialization.save();
    } catch (error) {
      console.error("Error creating new specialization:", error);
      throw new Error("Unable to create new specialization");
    }
  }

  async fetchAllSpecialization(): Promise<ISpecialization[]> {
    try {
      return await SpecializationModal.find();
    } catch (error) {
      console.error("Error while fetching specializations:", error);
      throw new Error("Unable to fetch specializations");
    }
  }

  async fetchByName(name: string): Promise<ISpecialization> {
    try {
      return await SpecializationModal.findOne({ name });
    } catch (error) {
      console.error("Error while fetching specialization:", error);
      throw new Error("Unable to fetch specialization");
    }
  }
}
