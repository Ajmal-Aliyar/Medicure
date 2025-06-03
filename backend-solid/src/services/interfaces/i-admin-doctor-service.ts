import { ApprovedDoctorsDto, DoctorApprovalDetailsDto, DoctorApprovalRequestDto } from "@/dtos";
import { IPagination, IReviewStatus } from "@/interfaces";
import { IDoctor } from "@/models";

export interface IAdminDoctorService {
  getDoctorsByReviewStatus(
    reviewStatus: string,
    pagination: IPagination
  ): Promise<{ total: number; doctors: (DoctorApprovalRequestDto | ApprovedDoctorsDto | Partial<IDoctor>)[]}>;
  getDoctorApprovalDetails(
    doctorId: string | null
  ): Promise<DoctorApprovalDetailsDto>;
  updateDoctorStatus(
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<void>;
  blockDoctor(doctorId: string, reason?: string): Promise<void>
  unblockDoctor(doctorId: string): Promise<void>
}
