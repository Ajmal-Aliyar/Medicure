import { FrontendPrescriptionPayload } from "@/interfaces/common/Prescription";
import { IPrescription } from "@/models";

export interface IDoctorPrescriptionService {
  createOrUpdatePrescription(
  doctorId: string,
  prescription: FrontendPrescriptionPayload
): Promise<IPrescription>;
}
