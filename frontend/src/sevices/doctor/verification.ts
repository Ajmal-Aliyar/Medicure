import { IPutVerificationProofs, ISlotDetails, IVerficationDetails, IVerificationProofs } from "../../types/doctor/verifyDetailsType"
import { api } from "../../utils/axiosInstance"


export const getSlotsApi = async () => {
    return  await api.get<{ slots:ISlotDetails[], fees: number}>('/api/slot/get-slot-details')
}

export const updateSlotsApi = async (slots:ISlotDetails[], fees: number | undefined) => {
    return await api.put(`/api/slot/manage-slots`,{
        slots, fees
    })
}

export const getVerificationProofsApi = async () => {
    return  await api.get<IVerificationProofs>('/api/doctor/verification/verification-proofs');
}

export const putVerficationProofsApi = async ({identityUrl, medicalUrl, establishmentUrl}: IPutVerificationProofs ) => {
    return await api.patch('/api/doctor/verification/verification-proofs', {
        identityProof: identityUrl,
        medicalRegistration: medicalUrl,
        establishmentProof: establishmentUrl
    })
}

export const getVerificationDetailsApi = async () => {
    return  await api.get('/api/doctor/verification/verification-details');
}

export const patchVerificationDetailsApi = async (formData: IVerficationDetails) => {
    return await api.patch('/api/doctor/verification/verification-details',{
        ...formData
    })
}

export const submitVerificationApi = async () => {
    return api.post<{ status: string }>('/api/doctor/verification/submit-verification');
}