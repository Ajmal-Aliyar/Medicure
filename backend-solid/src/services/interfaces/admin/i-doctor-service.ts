import {
  ApprovedDoctorsDto,
  DoctorApprovalDetailsDto,
  DoctorApprovalRequestDto,
  DoctorMappedProfileDto,
  PublicDoctorDetails,
} from "@/dtos";
import { IPagination } from "@/interfaces";
import { IDoctor } from "@/models";
import { FilterDoctorQuery } from "@/validators";

export interface IAdminDoctorService {
  getDoctorProfile(
      doctorId: string | null
    ): Promise<DoctorMappedProfileDto>
  getDoctorsByReviewStatus(
    reviewStatus: string,
    pagination: IPagination
  ): Promise<{
    total: number;
    doctors: (
      | DoctorApprovalRequestDto
      | ApprovedDoctorsDto
      | Partial<IDoctor>
    )[];
  }>;
  getFilteredDoctor(
    doctorOptions: FilterDoctorQuery, pagination: IPagination
  ): Promise<{ total: number; doctors: PublicDoctorDetails[] }>;
  getDoctorApprovalDetails(
    doctorId: string | null
  ): Promise<DoctorApprovalDetailsDto>;
  updateDoctorStatus(
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<void>;
  blockDoctor(doctorId: string, reason?: string): Promise<void>;
  unblockDoctor(doctorId: string): Promise<void>;
}
