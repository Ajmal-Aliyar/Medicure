import { DoctorProfileDTO, DoctorProfileUpdateDTO, ProfessionalVerificationDTO, VerificationProofsDto } from "@/dtos";
import { IDoctor } from "@/models";

export interface IDoctorService {
  updateProfileImg(doctorId: string, imageUrl: string): Promise<void>;
  getProfile(doctorId: string): Promise<DoctorProfileDTO>;
  updateProfile( doctorId: string, updateData: DoctorProfileUpdateDTO): Promise<void>;
  getProfessionalDetails(doctorId: string): Promise<ProfessionalVerificationDTO>;
  updateProfessionalDetails(doctorId: string,data: ProfessionalVerificationDTO): Promise<void>;
  getVerificationProofs(doctorId: string): Promise<VerificationProofsDto>;
  updateVerificationProofs( doctorId: string, proofs: VerificationProofsDto): Promise<void>;
  submitForReview(doctorId: string): Promise<void>;
  ensureDoctorExists(doctorId: string): Promise<IDoctor>
}
