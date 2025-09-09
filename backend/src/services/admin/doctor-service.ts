import { ADMIN_MESSAGES } from "@/constants";
import { TYPES } from "@/di/types";
import {
  ApprovedDoctorsDto,
  DoctorApprovalDetailsDto,
  DoctorApprovalRequestDto,
  DoctorMappedProfileDto,
  PublicDoctorDetails,
} from "@/dtos";
import { BadRequestError } from "@/errors";
import { IPagination, IReviewStatus } from "@/interfaces";
import { AdminDoctorMapper, AuthMapper, DoctorMapper } from "@/mappers";
import { IDoctor } from "@/models";
import { IDoctorRepository } from "@/repositories";
import { IAdminDoctorService } from "@/services";
import {
  ensureDoctorExists,
  getValidDoctorReviewStatus,
  mapFilterQueryToDoctorOptions,
} from "@/utils";
import { FilterDoctorQuery } from "@/validators";
import { inject, injectable } from "inversify";
@injectable()
export class AdminDoctorService implements IAdminDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository
  ) {}

  async getFilteredDoctor(
    doctorOptions: FilterDoctorQuery,
    pagination: IPagination
  ): Promise<{ total: number; doctors: PublicDoctorDetails[] }> {
    const options = mapFilterQueryToDoctorOptions(doctorOptions, true);
    const { data, total } = await this._doctorRepo.filterDoctorForAdmin(
      options,
      pagination
    );
    const filteredDoctor = DoctorMapper.toDoctorCardDto(data, true);
    return { total, doctors: filteredDoctor };
  }

  async getDoctorProfile(
    doctorId: string | null
  ): Promise<DoctorMappedProfileDto> {
    const doctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    return AdminDoctorMapper.toMapDoctorWithDefaults(doctor);
  }

  async getDoctorsByReviewStatus(
    reviewStatus: string,
    pagination: IPagination
  ): Promise<{
    total: number;
    doctors: (
      | DoctorApprovalRequestDto
      | ApprovedDoctorsDto
      | Partial<IDoctor>
    )[];
  }> {
    reviewStatus = getValidDoctorReviewStatus(reviewStatus) as IReviewStatus;
    const { total, doctors } =
      await this._doctorRepo.getDoctorsSummaryByReviewStatus(
        reviewStatus,
        pagination
      );
    const dtos = doctors.map((doctor) => {
      switch (reviewStatus) {
        case "approved":
          return AdminDoctorMapper.toDoctorApprovedSummaryDto(doctor);
        case "rejected":
        case "applied":
          return AdminDoctorMapper.toDoctorApprovalSummaryDto(doctor);
        case "pending":
          return AuthMapper.toUserDto(doctor, "doctor");
        default:
          return AuthMapper.toUserDto(doctor, "doctor");
      }
    });
    return { total, doctors: dtos };
  }

  async getDoctorApprovalDetails(
    doctorId: string | null
  ): Promise<DoctorApprovalDetailsDto> {
    const doctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    return AdminDoctorMapper.toDoctorApprovalDetailsDto(doctor);
  }

  async updateDoctorStatus(
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<void> {
    const validStatuses = ["approved", "rejected"];
    if (!validStatuses.includes(reviewStatus)) {
      throw new BadRequestError(
        ADMIN_MESSAGES.VALIDATION.INVALID_REVIEW_STATUS
      );
    }
    const doctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    if (doctor.status.profile.reviewStatus !== "applied") {
      throw new BadRequestError(
        ADMIN_MESSAGES.VALIDATION.ONLY_APPLIED_CAN_BE_UPDATED
      );
    }
    doctor.status.profile.reviewStatus = reviewStatus;
    if (reviewStatus === "rejected") {
      doctor.status.profile.reviewComment =
        reviewComment ?? "No reason provided";
    } else {
      doctor.status.profile.reviewComment = null;
      doctor.status.profile.isApproved = true;
    }
    await this._doctorRepo.update(doctorId, doctor);
  }

  async blockDoctor(doctorId: string, reason?: string): Promise<void> {
    await this.setDoctorBlockStatus(doctorId, true, reason);
  }

  async unblockDoctor(doctorId: string): Promise<void> {
    await this.setDoctorBlockStatus(doctorId, false);
  }

  private async setDoctorBlockStatus(
    doctorId: string,
    block: boolean,
    reason?: string
  ): Promise<void> {
    const doctor = await ensureDoctorExists(doctorId, this._doctorRepo);
    if (doctor.status.accountStatus.isBlocked === block) {
      const msg = block
        ? ADMIN_MESSAGES.ERROR.DOCTOR_ALREADY_BLOCKED
        : ADMIN_MESSAGES.ERROR.DOCTOR_NOT_BLOCKED;
      throw new BadRequestError(msg);
    }
    doctor.status.accountStatus.isBlocked = block;
    doctor.status.accountStatus.reason = block ? reason ?? null : null;
    await this._doctorRepo.update(doctorId, doctor);
  }
}
