import { DoctorProfileDTO, DoctorProfileUpdateDTO, DoctorScheduleDTO, ProfessionalVerificationDTO, VerificationProofsDTO } from "@/dtos";

export interface IDoctorService {
  updateProfileImg(doctorId: string, imageUrl: string): Promise<void>;
  getProfile(doctorId: string): Promise<{ doctor: DoctorProfileDTO, schedule: DoctorScheduleDTO | null}> ;
  updateProfile( doctorId: string, updateData: DoctorProfileUpdateDTO): Promise<void>;
  getProfessionalDetails(doctorId: string): Promise<ProfessionalVerificationDTO>;
  updateProfessionalDetails(doctorId: string,data: ProfessionalVerificationDTO): Promise<void>;
  getVerificationProofs(doctorId: string): Promise<VerificationProofsDTO>;
  updateVerificationProofs( doctorId: string, proofs: VerificationProofsDTO): Promise<void>;
  submitForReview(doctorId: string): Promise<void>;
}
