import { IPutVerificationProofs, ISlotDetails, IVerficationDetails, IVerificationProofs } from "../../types/doctor/verifyDetailsType"
import { api } from "../../utils/axiosInstance"


export const getSlotsApi = async () => {
    return  await api.get<{ slots:ISlotDetails[], fees: number}>('/api/doctor/slots')
}

export const updateSlotsApi = async (slots:ISlotDetails[], fees: number | undefined) => {
    return await api.put(`/api/doctor/slots`,{
        slots, fees
    })
}

export const getVerificationProofsApi = async () => {
    return  await api.get<IVerificationProofs>('/api/doctor/verification-proofs');
}

export const putVerficationProofsApi = async ({identityUrl, medicalUrl, establishmentUrl}: IPutVerificationProofs ) => {
    return await api.patch('/api/doctor/verification-proofs', {
        identityProof: identityUrl,
        medicalRegistration: medicalUrl,
        establishmentProof: establishmentUrl
    })
}

export const getVerificationDetailsApi = async () => {
    return  await api.get('/api/doctor/verification-details');
}

export const patchVerificationDetailsApi = async (formData: IVerficationDetails) => {
    return await api.patch('/api/doctor/verification-details',{
        ...formData
    })
}