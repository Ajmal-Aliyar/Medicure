import { inject } from "inversify";
import { IPatientDoctorService } from "../interfaces";
import { TYPES } from "@/di/types";
import { IDoctorRepository } from "@/repositories";
import { FilterDoctorQuery } from "@/validators";
import { IPagination } from "@/interfaces";
import { PublicDoctorDetails } from "@/dtos";
import { DoctorMapper } from "@/mappers";
import { mapFilterQueryToDoctorOptions } from "@/utils";

export class PatientDoctorService implements IPatientDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository
  ) {}

  async getPublicDoctorDetails(
    doctorOptions: FilterDoctorQuery,
    pagination: IPagination
  ): Promise<{ total: number; doctors: PublicDoctorDetails[] }> {
    const options = mapFilterQueryToDoctorOptions(doctorOptions, false);
    const { data, total } = await this.doctorRepo.PublicDoctorCardDetails(
      options,
      pagination
    );
    const filteredDoctor = DoctorMapper.toDoctorCardDto(data, false)
    return { total, doctors: filteredDoctor };
  }
}
