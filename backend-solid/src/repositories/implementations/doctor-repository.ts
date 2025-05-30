import { DoctorModel, IDoctor } from "@/models";
import { injectable } from "inversify";
import { BaseRepository, IDoctorRepository } from "@/repositories";
import { CreateUserDto } from "@/dtos";

@injectable()
export class DoctorRepository
  extends BaseRepository<IDoctor>
  implements IDoctorRepository
{
  constructor() {
    super(DoctorModel);
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    return await this.model.findOne({ email });
  }

  async findById(id: string): Promise<IDoctor | null> {
    return await this.model.findById(id);
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
}
