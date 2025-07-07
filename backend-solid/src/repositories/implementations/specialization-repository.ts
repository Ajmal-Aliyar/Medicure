import { ISpecialization, SpecializationModel } from "@/models";
import { BaseRepository } from "../base";
import {
  ISpecializationRepository,
  SpecializationPublicDetails,
} from "../interfaces";

export class SpecializationRepository
  extends BaseRepository<ISpecialization>
  implements ISpecializationRepository
{
  constructor() {
    super(SpecializationModel);
  }

  async getPublicDetails(): Promise<SpecializationPublicDetails[]> {
    const results = await this.model
      .find({}, { name: 1, imageUrl: 1 })
      .sort({ name: 1 })
      .lean()
      .exec();
    return results.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      imageUrl: doc.imageUrl,
    }));
  }
}
