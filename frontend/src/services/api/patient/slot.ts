import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { ISlot } from "@/types/slot";

const BASE_URL = "/api/patient/slot";

export const patientSlotService = {
  getDoctorSlotsForBooking: async ( doctorId: string, date: string, page: number): Promise<{ data: ISlot[], meta: MetaType}> => {
    const response = await api.get<{ data: ISlot[], meta: MetaType}>(
      `${BASE_URL}?doctorId=${doctorId}&date=${date}&page=${page}`
    );
    return response.data;
  },
};
