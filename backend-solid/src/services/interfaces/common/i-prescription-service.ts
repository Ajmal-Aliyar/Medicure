import { IPrescription } from "@/models";

export interface IPrescriptionService {
    getPrescription(id: string, role: string, prescriptionId: string): Promise<IPrescription>
}