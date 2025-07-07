import { PublicDoctorDetails } from "@/dtos";
import { IPagination } from "@/interfaces";
import { FilterDoctorQuery } from "@/validators";

export interface IPatientDoctorService {
    getPublicDoctorDetails(
        doctorOptions: FilterDoctorQuery,
        pagination: IPagination
      ): Promise<{ total: number; doctors: PublicDoctorDetails[] }>
}