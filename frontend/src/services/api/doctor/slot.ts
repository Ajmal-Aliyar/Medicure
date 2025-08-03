import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { ISlotDetails, SlotChartData } from "@/types/slot";

const BASE_URL = "/api/doctor/slot";

export const doctorSlotService = {
  getAllSlots: async (
    queryParams: URLSearchParams
  ): Promise<{ data: ISlotDetails[]; meta: MetaType }> => {
    const response = await api.get<{
      data: ISlotDetails[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams}`);
    return response.data;
  },

  updateSlotStatus: async (
    slotId: string,
    isActive: boolean
  ): Promise<ISlotDetails> => {
    const response = await api.patch<{ data: ISlotDetails }>(
      `${BASE_URL}/${slotId}/status`,
      { isActive }
    );
    return response.data.data;
  },

  getStats: async (
    startDate: string,
    endDate: string
  ): Promise<SlotChartData[]> => {
    const response = await api.get<{ data: SlotChartData[] }>(
      `${BASE_URL}/stats?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.data;
  },
};
