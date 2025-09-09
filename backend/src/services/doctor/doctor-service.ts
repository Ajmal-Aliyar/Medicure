import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IDoctorRepository } from "@/repositories";
import { IMediaService } from "@/interfaces";
import { DoctorProfileMapper } from "@/mappers";
import { BadRequestError, InternalServerError } from "@/errors";
import { CLIENT_MESSAGES } from "@/constants";
import {
  DoctorProfileDTO,
  DoctorProfileUpdateDTO,
  ProfessionalVerificationDTO,
  VerificationProofsDto,
} from "@/dtos";
import { IDoctor, IDoctorSchedule } from "@/models";
import { ensureDoctorExists } from "@/utils";
import { IDoctorScheduleService, IDoctorService } from "../interfaces";

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository,
    @inject(TYPES.MediaService)
    private readonly _mediaService: IMediaService,
    @inject(TYPES.DoctorScheduleService)
    private readonly _scheduleService: IDoctorScheduleService
  ) {}


  async updateProfileImg(doctorId: string, imageUrl: string): Promise<void> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    await this.deleteExistingProfileImage(doctor);
    const updated = await this._doctorRepo.updateImage(doctorId, imageUrl);
    if (!updated) {
      throw new InternalServerError(CLIENT_MESSAGES.ERROR.IMAGE_UPDATE_FAILED);
    }
  }

  async getProfile(doctorId: string): Promise<{ doctor: DoctorProfileDTO, schedule: IDoctorSchedule | null}> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    const data = DoctorProfileMapper.toDoctor(doctor);
    const schedule = await this._scheduleService.getSchedule(doctor.id)
    return { doctor: data, schedule }
  }

  async updateProfile(
    doctorId: string,
    updateData: DoctorProfileUpdateDTO
  ): Promise<void> {
    const updateFields = DoctorProfileMapper.toDoctorUpdate(updateData);
    const updated = await this._doctorRepo.update(doctorId, updateFields);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.PROFILE_UPDATE_FAILED
      );
    }
  }

  async getProfessionalDetails(
    doctorId: string
  ): Promise<ProfessionalVerificationDTO> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    return DoctorProfileMapper.toProfessionalDetails(doctor);
  }

  async updateProfessionalDetails(
    doctorId: string,
    data: ProfessionalVerificationDTO
  ): Promise<void> {
    const updateData = DoctorProfileMapper.toUpdateProfessionalDetails(data);
    const updated = await this._doctorRepo.update(doctorId, updateData);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.VERIFICATION_UPDATE_FAILED
      );
    }
  }

  async getVerificationProofs(
    doctorId: string
  ): Promise<VerificationProofsDto> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    return DoctorProfileMapper.toVerificationProofs(doctor);
  }

  async updateVerificationProofs(
    doctorId: string,
    proofs: VerificationProofsDto
  ): Promise<void> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    const filteredProofs = await this.cleanupOldDocuments(doctor, proofs);
    const updateData = DoctorProfileMapper.toUpdateVerificationProofs(filteredProofs);
    console.log(updateData, "updateData")
    const updated = await this._doctorRepo.update(doctorId, updateData);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.VERIFICATION_UPDATE_FAILED
      );
    }
  }

  async submitForReview(doctorId: string): Promise<void> {
    const doctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    const isProfileComplete = this.isProfileComplete(doctor);

    if (!isProfileComplete) {
      throw new BadRequestError(
        CLIENT_MESSAGES.VALIDATION.PROFILE_NOT_COMPLETED
      );
    }
    await this._doctorRepo.updateStatus(doctorId, {
      "status.profile.reviewStatus": "applied",
    });
  }

  private isProfileComplete(doctor: IDoctor): boolean {
    const { personal, professional, location } = doctor;

    const hasPersonalInfo =
      !!personal?.fullName &&
      !!personal?.email &&
      !!personal?.mobile &&
      !!personal?.gender &&
      !!personal?.dob;

    const hasProfessionalInfo =
      !!professional?.registrationNumber &&
      !!professional?.registrationCouncil &&
      !!professional?.registrationYear &&
      !!professional?.specialization &&
      !!professional?.headline &&
      !!professional?.about &&
      typeof professional?.yearsOfExperience === "number" &&
      Array.isArray(professional?.education) &&
      professional.education.length > 0 &&
      Array.isArray(professional?.experience) &&
      !!professional?.documents?.identityProof &&
      !!professional?.documents?.medicalRegistration &&
      !!professional?.documents?.establishmentProof;

    const hasLocation =
      !!location?.street &&
      !!location?.city &&
      !!location?.state &&
      !!location?.country &&
      !!location?.pincode;


    return hasPersonalInfo && hasProfessionalInfo && hasLocation;
  }

  private async deleteExistingProfileImage(doctor: IDoctor): Promise<void> {
    const existingUrl = doctor.personal?.profileImage;
    if (!existingUrl) return;

    const publicId = this._mediaService.extractPublicId(existingUrl);
    if (publicId) {
      await this._mediaService.delete([publicId]);
    }
  }

  private async cleanupOldDocuments(
  doctor: IDoctor,
  newProofs: VerificationProofsDto
): Promise<VerificationProofsDto> {
  const proofKeys: (keyof VerificationProofsDto)[] = [
    "identityProof",
    "medicalRegistration",
    "establishmentProof",
  ];

  const publicIdsToDelete: string[] = [];

  for (const key of proofKeys) {
    const newValue = newProofs[key];
    const existingValue = doctor.professional?.documents?.[key];

    if (newValue && existingValue) {
      const publicId = this._mediaService.extractPublicId(existingValue);
      if (publicId) publicIdsToDelete.push(publicId);
    }
    if (!newValue && existingValue) {
      newProofs[key] = existingValue;
    }
  }

  if (publicIdsToDelete.length > 0) {
    await this._mediaService.delete(publicIdsToDelete);
  }

  return newProofs;
}

}
