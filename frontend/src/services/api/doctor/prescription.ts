import { api } from "@/lib/axios";
import type { IPrescription, IPrescriptionService, IViewPrescription } from "@/types/prescription";


const BASE_URL = "/api/doctor/prescription";

interface IDoctorPrescriptionService extends IPrescriptionService {
    createOrUpdatePrescription(prescription: IPrescription): Promise<IPrescription>;
}
export const doctorPrescriptionService: IDoctorPrescriptionService = {
   createOrUpdatePrescription: async(prescription: Partial<IPrescription>): Promise<IPrescription> => {
    console.log(prescription, 'prerpere');
    
    const endpoint = prescription._id
      ? `${BASE_URL}/${prescription._id}`
      : BASE_URL;

    const method = prescription._id ? "put" : "post";

    const { data } = await api.request<{ data: IPrescription }>({
      url: endpoint,
      method,
      data: prescription,
    });

    return data.data;
  },

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
