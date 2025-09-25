import {
  ApprovedDoctorsDTO,
  DoctorApprovalDetailsDTO,
  DoctorApprovalRequestDTO,
  DoctorMappedProfileDto,
  PublicDoctorDetailsDTO,
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
      | DoctorApprovalRequestDTO
      | ApprovedDoctorsDTO
      | Partial<IDoctor>
    )[];
  }>;
  getFilteredDoctor(
    doctorOptions: FilterDoctorQuery, pagination: IPagination
  ): Promise<{ total: number; doctors: PublicDoctorDetailsDTO[] }>;
  getDoctorApprovalDetails(
    doctorId: string | null
  ): Promise<DoctorApprovalDetailsDTO>;
  updateDoctorStatus(
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<void>;
  blockDoctor(doctorId: string, reason?: string): Promise<void>;
  unblockDoctor(doctorId: string): Promise<void>;
}
