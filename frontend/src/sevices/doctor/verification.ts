import { IVerificationDetails } from "../../components/doctor/verify-details/ProfileDetailsForm";
import {
  IPutVerificationProofs,
  ISlotDetails,
  IVerficationDetails,
  IVerificationProofs,
} from "../../types/doctor/verifyDetailsType";
import { api } from "../../utils/axiosInstance";

export const getSlotsApi = async () => {
  return await api.get<{ slots: ISlotDetails[]; fees: number }>(
    "/api/slot/get-slot-details"
  );
};

export const updateSlotsApi = async (
  slots: ISlotDetails[],
  fees: number | undefined
) => {
  return await api.put(`/api/slot/manage-slots`, {
    slots,
    fees,
  });
};




//restructure
export const submitVerificationApi = async () => {
    return api.patch<{ success: string }>(
        "/api/doctor/profile/request-review"
  );
};

export const patchVerificationDetailsApi = async (
    formData: IVerficationDetails
) => {
    return await api.patch("/api/doctor/profile/professional", {
        ...formData,
    });
};
export const getVerificationDetailsApi = async ():Promise<{data: IVerificationDetails}> => {
    const response = await api.get<{data: IVerificationDetails}>("/api/doctor/profile/professional");
    return response.data
};

export const putVerficationProofsApi = async ({
  identityUrl,
  medicalUrl,
  establishmentUrl,
}: IPutVerificationProofs) => {
  return await api.patch("/api/doctor/profile/proofs", {
    identityProof: identityUrl,
    medicalRegistration: medicalUrl,
    establishmentProof: establishmentUrl,
  });
};

export const getVerificationProofsApi = async (): Promise<{data: IVerificationProofs}> => {
  const response = await api.get<{data: IVerificationProofs}>(
    "/api/doctor/profile/proofs"
  );
  return response.data
};
