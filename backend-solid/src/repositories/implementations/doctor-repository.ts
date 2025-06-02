import { DoctorModel, IDoctor } from "@/models";
import { injectable } from "inversify";
import { BaseRepository, IDoctorRepository } from "@/repositories";
import { CreateUserDto } from "@/dtos";
import { UpdateQuery } from "mongoose";

@injectable()
export class DoctorRepository
  extends BaseRepository<IDoctor>
  implements IDoctorRepository
{
  constructor() {
    super(DoctorModel);
  }

  async register(data: CreateUserDto): Promise<Partial<IDoctor>> {
    const doctor = {
      personal: data,
    };
    return await this.model.create(doctor);
  }

  async updateImage(
    doctorId: string,
    imageUrl: string
  ): Promise<IDoctor | null> {
    const updatedDoctor = await this.model.findByIdAndUpdate(
      doctorId,
      { "personal.profileImage": imageUrl },
      { new: true }
    );
    return updatedDoctor;
  }

  async updateStatus(
    doctorId: string,
    update: UpdateQuery<IDoctor["status"]>
  ): Promise<IDoctor | null> {
    return this.model
      .findByIdAndUpdate(doctorId, { $set: update }, { new: true })
      .exec();
  }
}
