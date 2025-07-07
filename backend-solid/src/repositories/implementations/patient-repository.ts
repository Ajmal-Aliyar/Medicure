import { injectable } from "inversify";
import { CreateUserDto } from "@/dtos";
import { IPatient, PatientModel } from "@/models";
import { BaseRepository, IPatientRepository } from "@/repositories";

@injectable()
export class PatientRepository
  extends BaseRepository<IPatient>
  implements IPatientRepository
{
  constructor() {
    super(PatientModel);
  }

  async findByEmail(email: string): Promise<IPatient | null> {
    return await this.model.findOne({ 'personal.email': email });
  }

  async register(data: CreateUserDto): Promise<Partial<IPatient>> {
    const patient = {
      personal: data,
    };
    return await this.model.create(patient);
  }

  async updateImage(
    doctorId: string,
    imageUrl: string
  ): Promise<IPatient | null> {
    const updatedDoctor = await this.model.findByIdAndUpdate(
      doctorId,
      { "personal.profileImage": imageUrl },
      { new: true }
    );
    return updatedDoctor;
  }
}
