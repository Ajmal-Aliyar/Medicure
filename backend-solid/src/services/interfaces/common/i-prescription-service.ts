import { ViewPrescription } from "@/interfaces/common/Prescription";
import { IPrescription } from "@/models";

export interface IPrescriptionService {
    getPrescription(id: string, role: string, prescriptionId: string): Promise<IPrescription>;
     viewPrescriptionForDownload(
        id: string,
        role: string,
        prescriptionId: string
      ): Promise<ViewPrescription>
}