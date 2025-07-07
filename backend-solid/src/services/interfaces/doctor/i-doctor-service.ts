import { DoctorProfileDTO, DoctorProfileUpdateDTO, ProfessionalVerificationDTO, VerificationProofsDto } from "@/dtos";
import { IDoctorSchedule } from "@/models";

export interface IDoctorService {
  updateProfileImg(doctorId: string, imageUrl: string): Promise<void>;
  getProfile(doctorId: string): Promise<{ doctor: DoctorProfileDTO, schedule: IDoctorSchedule | null}> ;
  updateProfile( doctorId: string, updateData: DoctorProfileUpdateDTO): Promise<void>;
  getProfessionalDetails(doctorId: string): Promise<ProfessionalVerificationDTO>;
  updateProfessionalDetails(doctorId: string,data: ProfessionalVerificationDTO): Promise<void>;
  getVerificationProofs(doctorId: string): Promise<VerificationProofsDto>;
  updateVerificationProofs( doctorId: string, proofs: VerificationProofsDto): Promise<void>;
  submitForReview(doctorId: string): Promise<void>;
}
