import { CreateUserDto } from "@/dtos";
import { IPatient } from "@/models";

export interface IPatientRepository {
  findByEmail(email: string): Promise<IPatient | null>;
  findById(id: string): Promise<IPatient | null>;
  register(data: CreateUserDto): Promise<Partial<IPatient>>;
}
