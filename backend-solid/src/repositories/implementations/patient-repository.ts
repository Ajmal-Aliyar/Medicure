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
  async register(data: CreateUserDto): Promise<Partial<IPatient>> {
    const patient = {
      personal: data,
    };
    return await this.model.create(patient);
  }
}
