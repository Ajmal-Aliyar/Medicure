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
import { IDoctor } from "@/models";
import { ensureDoctorExists } from "@/utils";
import { IDoctorService } from "../interfaces";

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.MediaService)
    private readonly mediaService: IMediaService
  ) {}


  async updateProfileImg(doctorId: string, imageUrl: string): Promise<void> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    await this.deleteExistingProfileImage(doctor);
    const updated = await this.doctorRepo.updateImage(doctorId, imageUrl);
    if (!updated) {
      throw new InternalServerError(CLIENT_MESSAGES.ERROR.IMAGE_UPDATE_FAILED);
    }
  }

  async getProfile(doctorId: string): Promise<DoctorProfileDTO> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    return DoctorProfileMapper.toDoctor(doctor);
  }

  async updateProfile(
    doctorId: string,
    updateData: DoctorProfileUpdateDTO
  ): Promise<void> {
    const updateFields = DoctorProfileMapper.toDoctorUpdate(updateData);
    const updated = await this.doctorRepo.update(doctorId, updateFields);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.PROFILE_UPDATE_FAILED
      );
    }
  }

  async getProfessionalDetails(
    doctorId: string
  ): Promise<ProfessionalVerificationDTO> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    return DoctorProfileMapper.toProfessionalDetails(doctor);
  }

  async updateProfessionalDetails(
    doctorId: string,
    data: ProfessionalVerificationDTO
  ): Promise<void> {
    const updateData = DoctorProfileMapper.toUpdateProfessionalDetails(data);
    const updated = await this.doctorRepo.update(doctorId, updateData);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.VERIFICATION_UPDATE_FAILED
      );
    }
  }

  async getVerificationProofs(
    doctorId: string
  ): Promise<VerificationProofsDto> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    return DoctorProfileMapper.toVerificationProofs(doctor);
  }

  async updateVerificationProofs(
    doctorId: string,
    proofs: VerificationProofsDto
  ): Promise<void> {
    const doctor: IDoctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    await this.cleanupOldDocuments(doctor, proofs);
    const updateData = DoctorProfileMapper.toUpdateVerificationProofs(proofs);
    const updated = await this.doctorRepo.update(doctorId, updateData);
    if (!updated) {
      throw new InternalServerError(
        CLIENT_MESSAGES.ERROR.VERIFICATION_UPDATE_FAILED
      );
    }
  }

  async submitForReview(doctorId: string): Promise<void> {
    const doctor = await ensureDoctorExists(doctorId, this.doctorRepo);
    const isProfileComplete = this.isProfileComplete(doctor);

    if (!isProfileComplete) {
      throw new BadRequestError(
        CLIENT_MESSAGES.VALIDATION.PROFILE_NOT_COMPLETED
      );
    }
    await this.doctorRepo.updateStatus(doctorId, {
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

    const publicId = this.mediaService.extractPublicId(existingUrl);
    if (publicId) {
      await this.mediaService.delete([publicId]);
    }
  }

  private async cleanupOldDocuments(
    doctor: IDoctor,
    newProofs: VerificationProofsDto
  ): Promise<void> {
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
        const publicId = this.mediaService.extractPublicId(existingValue);
        if (publicId) publicIdsToDelete.push(publicId);
      }
    }

    if (publicIdsToDelete.length > 0) {
      await this.mediaService.delete(publicIdsToDelete);
    }
  }
}
