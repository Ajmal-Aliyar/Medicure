import { IChat } from "../../types/chat/ChatType";
import { api } from "../../utils/axiosInstance";

export const fetchChatsApi = async (userId: string): Promise<{ data: IChat[] }> => {
    const response = await api.get<{ data: IChat[] }>(`/api/chat/user/${userId}`);
    return response.data;
};


export const markAsReadApi = async (chatId: string): Promise<void> => {
    await api.get(`/api/chat/markAsRead/${chatId}`)
    return 
}