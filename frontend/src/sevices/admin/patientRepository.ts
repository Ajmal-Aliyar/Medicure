import { IPatientProfile } from "../../types/patient/profileType";
import { api } from "../../utils/axiosInstance";

export const fetchAllPatientsApi = async (skip: number, limit: number): Promise<{data: IPatientProfile[],total:number}> => {
    const response = await api.get<{data: IPatientProfile[],total:number}>(`/api/admin/getAllPatients?skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , total: 0}; 
    }
    return { data: response.data.data, total: response.data.total };
}

export const blockRole = async (_id: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/api/admin/doctors/${_id}/block`);
    return response.data;
};

export const unblockRole = async (_id: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/api/admin/doctors/${_id}/unblock`);
    return response.data;
};