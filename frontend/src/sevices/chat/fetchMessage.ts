import { IMessage } from "../../types/chat/ChatType";
import { api } from "../../utils/axiosInstance";


export const fetchMessagesApi = async (chatId: string): Promise<IMessage[]> => {
  const response = await api.get<IMessage[]>(`/api/message/messages/${chatId}`);
  return response.data;
};

export const sendMessageApi = async (content: string, senderId: string, chatId: string) => {
  await api.post('/api/message/messages', { content, senderId, chatId })
}

