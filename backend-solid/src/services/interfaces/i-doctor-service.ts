export interface IDoctorService {
  updateProfileImg(doctorId: string, imageUrl: string): Promise<void>;
}
