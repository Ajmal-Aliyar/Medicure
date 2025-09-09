import { api } from "@/lib/axios";
import type { ISpecialization, PublicSpecialization } from "@/types/specialization";

const BASE_URL = "/api/specialization";

export const specializationService = {
  getSpecialization: async (): Promise<PublicSpecialization[]> => {
    const response = await api.get<{ data: PublicSpecialization[] }>(
      `${BASE_URL}/`
    );
    return response.data.data;
  },

  getSpecializationDetails: async (specialization: string): Promise<ISpecialization> => {
    const response = await api.get<{ data: ISpecialization }>(
      `${BASE_URL}/${specialization}`
    );
    return response.data.data;
  },
};
