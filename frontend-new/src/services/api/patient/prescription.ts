import { api } from "@/lib/axios";
import type { IPrescription, IPrescriptionService, IViewPrescription } from "@/types/prescription";


const BASE_URL = "/api/patient/prescription";

interface IPatientPrescriptionService extends IPrescriptionService {}
export const patientPrescriptionService: IPatientPrescriptionService = {
  getPrescriptionDetails: async (prescriptionId: string): Promise<IPrescription> => {
    const { data } = await api.get<{ data: IPrescription }>(
      `${BASE_URL}/${prescriptionId}`
    );
    return data.data;
  },
  viewPrescriptionDetails: async (prescriptionId: string): Promise<IViewPrescription> => {
    const { data } = await api.get<{ data: IViewPrescription }>(
      `${BASE_URL}/view/${prescriptionId}`
    );
    return data.data;
  },
};
