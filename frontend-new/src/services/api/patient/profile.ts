import { api } from "@/lib/axios";
import type { PatientProfile } from "@/types/patient";

const BASE_URL = "/api/patient/profile";
export const patientProfileService = {
  getProfile: async (): Promise<PatientProfile> => {
    const response = await api.get<{ data: PatientProfile }>(`${BASE_URL}/`);
    return response.data.data;
  },

  updateProfile: async (data: PatientProfile): Promise<void> => {
     await api.patch<{ data: PatientProfile }>(
      `${BASE_URL}/`,
      data
    );
  },

  updateProfileImage: async (profileImage: string): Promise<void> => {
    await api.patch<{ data: PatientProfile }>(
      `${BASE_URL}/image`,
      { profileImage }
    );
  },
};

// export const updateProfileImageApi = async (profileImage: string) => {
//     try {
//         return await api.patch('/api/patient/profile/image',{profileImage})
//     }  catch (error) {
//         const errorMessage = handleAxiosError(error);
//         throw new Error(errorMessage);
//     }
// }
