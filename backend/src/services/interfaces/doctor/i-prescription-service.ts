import { FrontendPrescriptionPayloadDTO, PrescriptionDTO } from "@/dtos";
export interface IDoctorPrescriptionService {
  createOrUpdatePrescription(
  doctorId: string,
  prescription: FrontendPrescriptionPayloadDTO
): Promise<PrescriptionDTO>;
}
