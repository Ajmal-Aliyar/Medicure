import { IFetchTopDoctors } from "../../types/patient/findDoctors";
import { api } from "../../utils/axiosInstance";


export const fetchTopDoctorsApi = async (skip: number, limit: number): Promise<{data: IFetchTopDoctors[],hasMore:boolean}> => {
    const response = await api.get<{data: IFetchTopDoctors[],hasMore:boolean}>(`/api/patient/getTopDoctors?skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , hasMore: false}; 
    }
    return { data: response.data.data, hasMore: response.data.hasMore };
}