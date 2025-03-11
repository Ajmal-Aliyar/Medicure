import { api } from "../../utils/axiosInstance";


export const fetchMessagesApi = async (chatId: string): Promise<{ chatId: string, messages: any[] }> => {
  const response = await api.get<{ chatId: string, messages: any[] }>(`/api/message/messages/${chatId}`);
  return response.data;
};

export const sendMessageApi = async (content: string, senderId: string, chatId: string) => {
  await api.post('/api/message/messages', { content, senderId, chatId })
}

