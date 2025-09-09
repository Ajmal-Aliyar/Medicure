import { TYPES } from "@/di/types";
import { IPagination } from "@/interfaces";
import { PatientCardDetails } from "@/interfaces/common/card-details";
import { PatientMapper } from "@/mappers/patient-mapper";
import { IPatientRepository } from "@/repositories";
import { FilterPatientQuery } from "@/validators";
import { inject, injectable } from "inversify";
import { IAdminPatientService } from "../interfaces";
import { ensurePatientExists, mapFilterQueryToPatientOptions, transformPatientOptionsToMongoFilter } from "@/utils/patient-utils";
import { PatientProfileDto } from "@/dtos";
import { BadRequestError } from "@/errors";

@injectable()
export class AdminPatientService implements IAdminPatientService {
  constructor(
    @inject(TYPES.PatientRepository)
    private readonly _patientRepo: IPatientRepository
  ) {}

  async getFilteredPatient(
    PatientOptions: FilterPatientQuery,
    pagination: IPagination
  ): Promise<{ total: number; Patients: PatientCardDetails[] }> {
    const options = mapFilterQueryToPatientOptions(PatientOptions);
    const filter = transformPatientOptionsToMongoFilter(options)
    const { data, total } = await this._patientRepo.findAll({ filter, ...pagination, sort: {createdAt: -1}});
    const filteredPatient = PatientMapper.toPatientCardDto(data);
    return { total, Patients: filteredPatient };
  }

  async getPatientProfile(
    PatientId: string | null
  ): Promise<PatientProfileDto> {
    const Patient = await ensurePatientExists(PatientId, this._patientRepo);
    return PatientMapper.toPatientProfile(Patient);
  }

  async blockPatient(PatientId: string, reason?: string): Promise<void> {
    await this.setPatientBlockStatus(PatientId, true, reason);
  }

  async unblockPatient(PatientId: string): Promise<void> {
    await this.setPatientBlockStatus(PatientId, false);
  }

  private async setPatientBlockStatus(
    PatientId: string,
    block: boolean,
    reason?: string
  ): Promise<void> {
    const Patient = await ensurePatientExists(PatientId, this._patientRepo);
    if (Patient.status.isBlocked === block) {
      const msg = block
        ? "Patient already blocked."
        : "Patient already not blocked.";
      throw new BadRequestError(msg);
    }
    Patient.status.isBlocked = block;
    await this._patientRepo.update(PatientId, Patient);
  }
}
