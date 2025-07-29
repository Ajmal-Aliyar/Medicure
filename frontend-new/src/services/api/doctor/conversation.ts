import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IConversationDetails, IConversationService } from "@/types/conversation";

const BASE_URL = "/api/doctor/conversation";

export const doctorConversationService: IConversationService = {
  getConversations: async (page: number): Promise<{ data: IConversationDetails[], meta: MetaType}> => {
    const response = await api.get<{ data: IConversationDetails[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },
};
