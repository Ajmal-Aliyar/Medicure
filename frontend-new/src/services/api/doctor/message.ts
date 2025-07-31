import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IMessage, IMessageService } from "@/types/message";

const BASE_URL = "/api/doctor/message";
interface IDoctorMessageService extends IMessageService {}

export const doctorMessageService: IDoctorMessageService = {
  getMessages: async (
    conversationId: string,
    page: number
  ): Promise<{ data: IMessage[]; meta: MetaType }> => {
    const response = await api.get<{ data: IMessage[]; meta: MetaType }>(
      `${BASE_URL}/${conversationId}?page=${page}`
    );
    return response.data;
  },
};
