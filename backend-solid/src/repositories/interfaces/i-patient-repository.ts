import { CreateUserDto } from "@/dtos";
import { IPatient } from "@/models";
import { IBaseRepository } from "./i-base-repository";

export interface IPatientRepository extends IBaseRepository<IPatient> {
  register(data: CreateUserDto): Promise<Partial<IPatient>>;
  updateImage(doctorId: string, imageUrl: string): Promise<IPatient | null>;
}
