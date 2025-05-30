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
    return await this.model.findOne({ email });
  }

  async findById(id: string): Promise<IPatient | null> {
    return await this.model.findById(id);
  }

  async register(data: CreateUserDto): Promise<Partial<IPatient>> {
    const patient = {
      personal: data,
    };
    return await this.model.create(patient);
  }
}
