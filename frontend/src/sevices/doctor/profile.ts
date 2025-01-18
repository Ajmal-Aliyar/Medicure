import { IDoctorData } from "../../components/doctor/profile/validationProfile"
import { api } from "../../utils/axiosInstance"


export const getProfileDetails = async () => {
    return await api.get('/api/doctor/profile-details')   
}

export const updateProfileApi = async (doctorData:IDoctorData) => {
    return await api.patch('/api/doctor/profile-update',{...doctorData})
}

export const updateProfileImageApi = async (profileImage: string) => {
    return await api.patch('/api/doctor/update-profile-image',{profileImage})
}