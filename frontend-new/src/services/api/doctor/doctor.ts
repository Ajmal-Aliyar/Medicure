import { api } from "@/lib/axios";
import type { IVerificationDetails } from "@/pages/doctor/VerifyPage/components";
import type { ProfileState } from "@/slices/doctorSlice";
import type { IDoctorData, IProofVerification } from "@/types/doctor";
import type { IDoctorSchedule } from "@/types/schedule";

const BASE_URL = "/api/doctor/profile";

export const doctorService = {
  getProfileDetails: async (): Promise<{ doctor: ProfileState, schedule: IDoctorSchedule | null}> => {
    const response = await api.get<{ data: {doctor: ProfileState, schedule: IDoctorSchedule | null} }>(
      BASE_URL
    );
    return response.data.data;
  },

  updateProfile: async (doctorData: IDoctorData) => {
    return await api.patch(`${BASE_URL}/`, { ...doctorData });
  },

   updateProfileImage: async (profileImage: string) => {
    return await api.patch(`${BASE_URL}/image`, { profileImage });
  },

  getProfessionalDetails: async (): Promise<{ data: IVerificationDetails }> => {
    const response = await api.get<{ data: IVerificationDetails }>(
      `${BASE_URL}/professional`
    );
    return response.data;
  },

  updateProfessionalDetails: async (formData: IVerificationDetails) => {
    return await api.patch(`${BASE_URL}/professional`, {
      ...formData,
    });
  },

  getProofVerifications: async (): Promise<{ data: IProofVerification }> => {
    const response = await api.get<{ data: IProofVerification }>(
      `${BASE_URL}/proofs`
    );
    return response.data;
  },

  updateProofVerification: async ({
    identityProof,
    medicalRegistration,
    establishmentProof,
  }: IProofVerification) => {
    return await api.patch(`${BASE_URL}/proofs`, {
      identityProof,
      medicalRegistration,
      establishmentProof,
    });
  },

  submitForReview: async () => {
    return api.patch<{ success: string }>(`${BASE_URL}/request-review`);
  },
};
