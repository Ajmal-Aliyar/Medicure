import { CreateUserDto, FilterDoctorRepoResponseDTO } from "@/dtos";
import { IDoctor } from "@/models";
import { Types, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./i-base-repository";
import { GetDoctorOptions, IPagination } from "@/interfaces";

export interface IDoctorRepository extends IBaseRepository<IDoctor> {
  register(data: CreateUserDto): Promise<Partial<IDoctor>>;
  findByEmail(email: string): Promise<IDoctor | null>;
  updateImage(doctorId: string, imageUrl: string): Promise<IDoctor | null>;
  updateStatus(
    doctorId: string,
    update: UpdateQuery<IDoctor["status"]>
  ): Promise<IDoctor | null>;
  getDoctorsSummaryByReviewStatus(
    status: string,
    pagination: IPagination
  ): Promise<{ total: number; doctors: IDoctor[] }>;
  filterDoctorForAdmin(
    options: GetDoctorOptions,
    pagination: IPagination
  ): Promise<{ data: Partial<FilterDoctorRepoResponseDTO>[]; total: number }>;
  PublicDoctorCardDetails(
    options: GetDoctorOptions,
    pagination: IPagination
  ): Promise<{ data: Partial<FilterDoctorRepoResponseDTO>[]; total: number }>;
  findBasicInfoById(doctorId: string): Promise<{ name: string, specialization: string}>;
}


