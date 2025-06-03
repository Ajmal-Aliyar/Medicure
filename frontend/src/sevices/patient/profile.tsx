import { handleAxiosError } from "../../utils/errorUtil";
import { api } from "../../utils/axiosInstance"
import { IPatientProfilePayload, PatientProfileDto } from "../../types/patient/profileType";


export const getPatientProfileData = async () => {
    try {
        const response = await api.get<{data: PatientProfileDto}>('/api/patient/profile/');
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error); 
        throw new Error(errorMessage); 
    }
}

export const updatePatientProfileData = async (data:PatientProfileDto) => {
    try {
        return await api.patch('/api/patient/profile-details',data)
    } catch (error) {
        const errorMessage = handleAxiosError(error); 
        throw new Error(errorMessage); 
    }
}

export const updateProfileImageApi = async (profileImage: string) => {
    try {
        return await api.patch('/api/patient/update-profile-image',{profileImage})
    }  catch (error) {
        const errorMessage = handleAxiosError(error); 
        throw new Error(errorMessage); 
    }
}