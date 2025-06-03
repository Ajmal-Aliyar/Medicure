import { CreateUserDto } from "@/dtos";
import { IDoctor } from "@/models";
import { UpdateQuery } from "mongoose";
import { IBaseRepository } from "./i-base-repository";
import { IPagination } from "@/interfaces";

export interface IDoctorRepository extends IBaseRepository<IDoctor> {
  register(data: CreateUserDto): Promise<Partial<IDoctor>>;
  updateImage(doctorId: string, imageUrl: string): Promise<IDoctor | null>;
  updateStatus(
    doctorId: string,
    update: UpdateQuery<IDoctor["status"]>
  ): Promise<IDoctor | null>;
  getDoctorsSummaryByReviewStatus(
    status: string,
    pagination: IPagination): Promise<{ total: number; doctors: IDoctor[] }>;
}
