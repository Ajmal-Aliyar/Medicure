import { inject, injectable } from "inversify";
import { IPatientService } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPatientRepository } from "@/repositories";
import { PatientProfileDto } from "@/dtos";
import { PatientProfileMapper } from "@/mappers/patient";
import { IPatient } from "@/models";
import { ensurePatientExists } from "@/utils/patient-utils";
import { CLIENT_MESSAGES } from "@/constants";
import { InternalServerError } from "@/errors";
import { IMediaService } from "@/interfaces";

@injectable()
export class PatientService implements IPatientService {
  constructor(
    @inject(TYPES.PatientRepository)
    private readonly _patientRepo: IPatientRepository,
    @inject(TYPES.MediaService) private readonly mediaService: IMediaService
  ) {}

  async getProfile(patientId: string): Promise<PatientProfileDto> {
    const patient: IPatient = await ensurePatientExists(
      patientId,
      this._patientRepo
    );
    return PatientProfileMapper.toPatientDto(patient);
  }

  async updateProfile(
    patientId: string,
    updateData: PatientProfileDto
  ): Promise<void> {
    const updateFields = PatientProfileMapper.toPatientUpdate(updateData);

    const updated = await this._patientRepo.update(patientId, updateFields);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.PROFILE_UPDATE_FAILED
      );
    }
  }

  async updateProfileImg(patientId: string, imageUrl: string): Promise<void> {
      const patient: IPatient = await ensurePatientExists(patientId, this._patientRepo);
      await this.deleteExistingProfileImage(patient);
      const updated = await this._patientRepo.updateImage(patientId, imageUrl);
      if (!updated) {
        throw new InternalServerError(CLIENT_MESSAGES.ERROR.IMAGE_UPDATE_FAILED);
      }
    }

    private async deleteExistingProfileImage(patient: IPatient): Promise<void> {
        const existingUrl = patient.personal?.profileImage;
        if (!existingUrl) return;
    
        const publicId = this.mediaService.extractPublicId(existingUrl);
        if (publicId) {
          await this.mediaService.delete([publicId]);
        }
      }
  
}
