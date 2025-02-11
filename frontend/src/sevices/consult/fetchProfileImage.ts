import { api } from "../../utils/axiosInstance"

export const fetchProfileImageApi = async (role: string): Promise<{ profileImage: string }> => {
    const response = await api.get<{ profileImage: string }>(`/api/${role}/getProfileImage`);
    console.log(response.data)
    return response.data;
};
