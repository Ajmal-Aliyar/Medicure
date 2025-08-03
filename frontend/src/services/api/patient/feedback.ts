import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { FeedbackDetails } from "@/types/feedback";

const BASE_URL = "/api/patient/feedback";

export interface IPatientFeedbackService {
getFeedbackDetails(page: number): Promise<{ data: FeedbackDetails[],  meta: MetaType}>
submitFeedbackForAppointment(
    appointmentId: string,
    rating: number,
    comment: string
  ): Promise<void>;
}

export const patientFeedbackService: IPatientFeedbackService = {
  getFeedbackDetails: async (page: number): Promise<{ data: FeedbackDetails[], meta: MetaType}> => {
    const response = await api.get<{ data: FeedbackDetails[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },

  submitFeedbackForAppointment: async (
    appointmentId: string,
    rating: number,
    comment: string
  ): Promise<void> => {
      await api.post(`${BASE_URL}/${appointmentId}`, {
        rating,
        comment,
      });
  },
};
