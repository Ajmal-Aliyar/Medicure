import { IPatientProfile } from "../../types/patient/profileType";
import { api } from "../../utils/axiosInstance";

export const fetchAllPatientsApi = async (skip: number, limit: number): Promise<{data: IPatientProfile[],hasMore:boolean}> => {
    const response = await api.get<{data: IPatientProfile[],hasMore:boolean}>(`/api/admin/getAllPatients?skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , hasMore: false}; 
    }
    return { data: response.data.data, hasMore: response.data.hasMore };
}

export const blockRole = async (_id: string, role: string): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>(`/api/admin/block-role?_id=${_id}&role=${role}`);
    return response.data;
};

export const unblockRole = async (_id: string, role: string): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>(`/api/admin/unblock-role?_id=${_id}&role=${role}`);
    return response.data;
};