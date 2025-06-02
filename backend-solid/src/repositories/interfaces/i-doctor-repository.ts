import { CreateUserDto } from "@/dtos";
import { IDoctor } from "@/models";
import { UpdateQuery } from "mongoose";
import { IBaseRepository } from "./i-base-repository";

export interface IDoctorRepository extends IBaseRepository<IDoctor>{
  register(data: CreateUserDto): Promise<Partial<IDoctor>>;
  updateImage(doctorId: string, imageUrl: string): Promise<IDoctor | null>;
  updateStatus(doctorId: string, update: UpdateQuery<IDoctor['status']>): Promise<IDoctor | null>
}