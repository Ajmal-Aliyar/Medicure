import { ISpecialization } from "../../types/specialization/specialization";
import { api } from "../../utils/axiosInstance";

export const fetchSpecializationApi = async (name: string): Promise<{specialization: ISpecialization}> => {
    const response = await api.get<{specialization: ISpecialization}>(`/api/specialization/fetchSpecialization/${name}`);
    return response.data
}

export const fetchAllSpecializationApi = async(): Promise<{specializations: ISpecialization[]}> => {
    const response = await api.get<{specializations: ISpecialization[]}>('/api/specialization/fetchAllSpecialization')
    return response.data
}

export const createNewSpecializationApi = async (image: string | null, name: string, description: string): Promise<{ message: string, status: boolean }> => {
    const response = await api.post<{ message: string, status: boolean }>(`/api/specialization/create-specialization`,{ image, name, description});
    const {message, status} = response.data
    return { message, status};
}
