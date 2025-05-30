import { CreateUserDto } from "@/dtos";
import { IDoctor } from "@/models";

export interface IDoctorRepository {
  findByEmail(email: string): Promise<IDoctor | null>;
  findById(id: string): Promise<IDoctor | null>;
  register(data: CreateUserDto): Promise<Partial<IDoctor>>;
  updateImage(doctorId: string, imageUrl: string): Promise<IDoctor | null>;
}
