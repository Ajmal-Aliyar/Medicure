import { api } from "../../utils/axiosInstance"

export const fetchDoctorDetailsApi = async (): Promise<{ total: number, active: number, inactive: number }> => {
    const response = await api.get<{ total: number, active: number, inactive: number }>('/api/doctor/get-doctor-details')
    return response.data
}