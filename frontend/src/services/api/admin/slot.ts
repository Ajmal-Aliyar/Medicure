import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { ISlotDetails } from "@/types/slot";

const BASE_URL = "/api/admin/slot";

export const adminSlotService = {
  getAllSlots: async (
    queryParams: URLSearchParams
  ): Promise<{ data: ISlotDetails[]; meta: MetaType }> => {
    const response = await api.get<{
      data: ISlotDetails[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams}`);
    return response.data;
  },
};
