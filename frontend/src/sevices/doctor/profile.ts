import { api } from "../../utils/axiosInstance"


export const getProfileDetails = async () => {
    return await api.get<any>('/api/doctor/profile-details')   
}

export const updateProfileApi = async (doctorData:any) => {
    return await api.patch('/api/doctor/profile-update',{...doctorData})
}