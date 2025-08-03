import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { FeedbackDetails } from "@/types/feedback";

const BASE_URL = "/api/doctor/feedback";

export interface IDoctorFeedbackService {
getFeedbackDetails(doctorId: string, page: number): Promise<{ data: FeedbackDetails[],  meta: MetaType}>
}

export const doctorFeedbackService: IDoctorFeedbackService = {
  getFeedbackDetails: async (doctorId: string, page: number): Promise<{ data: FeedbackDetails[], meta: MetaType}> => {
    const response = await api.get<{ data: FeedbackDetails[],  meta: MetaType}>(
      `${BASE_URL}/${doctorId}/?page=${page}`
    );
    return response.data;
  },
};
