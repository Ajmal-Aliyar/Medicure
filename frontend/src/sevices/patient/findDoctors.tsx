import { IDoctorSotDetails, IFetchTopDoctors } from "../../types/patient/findDoctors";
import { api } from "../../utils/axiosInstance";


export const fetchTopDoctorsApi = async (skip: number, limit: number, searchParams: string, specialization?: string): Promise<{data: IFetchTopDoctors[],total:number}> => {
    const response = await api.get<{data: IFetchTopDoctors[], total:number}>(`/api/patient/getTopDoctors?skip=${skip}&limit=${limit}&${searchParams}${specialization ? `&specialization=${encodeURIComponent(specialization)}` : ''}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , total: 0}; 
    }
    return { data: response.data.data, total: response.data.total };
}

export const fetchSlotDetailsApi = async (doctorId: string): Promise<{slots: IDoctorSotDetails[]}> => {
    const response = await api.get<{slots: IDoctorSotDetails[]}>(`/api/slot/doctorSlotDetails/${doctorId}`);
    if (!response.data.slots || response.data.slots.length === 0) {
        return { slots: [] }; 
    }
    return response.data;
}

