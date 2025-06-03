import { inject, injectable } from "inversify";
import { IPatientService } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPatientRepository } from "@/repositories";
import { PatientProfileDto } from "@/dtos";
import { PatientProfileMapper } from "@/mappers/patient";
import { IPatient } from "@/models";
import { ensurePatientExists } from "@/utils/patient-utils";

@injectable()
export class PatientService implements IPatientService {
    constructor(
        @inject(TYPES.PatientRepository) private readonly patientRepo: IPatientRepository
    ) {}

    async getProfile(patientId: string): Promise<PatientProfileDto> {
        const patient: IPatient = await ensurePatientExists(patientId, this.patientRepo);
        return PatientProfileMapper.toPatientDto(patient);
    }
}