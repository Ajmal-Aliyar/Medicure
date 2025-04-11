import { handleAxiosError } from "../../utils/errorUtil";
import { api } from "../../utils/axiosInstance"
import { IPatientProfilePayload } from "../../types/patient/profileType";


export const getPatientProfileData = async () => {
    try {
        const response = await api.get('/api/patient/profile-details');
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error); 
        throw new Error(errorMessage); 
    }
}

export const updatePatientProfileData = async ({dob, bloodGroup, gender, houseName, street, state, city, country, pincode}:IPatientProfilePayload) => {
    try {
        return await api.patch('/api/patient/profile-details',{ dob, bloodGroup, gender, houseName, street, state, city, country, pincode})
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