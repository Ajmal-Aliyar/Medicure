import { api } from "@/lib/axios";
import type {
  AppointmentPageDetails,
  IAppointmentCard,
  IAppointmentService,
} from "@/types/appointment";
import type { MetaType } from "@/types/common";
import type { IFeedback } from "@/types/feedback";

const BASE_URL = "/api/admin/appointment";
 

export const adminAppointmentService: IAppointmentService = {
  getAllAppointments: async (
    queryParams: URLSearchParams
  ): Promise<{ data: IAppointmentCard[]; meta: MetaType }> => {
    const response = await api.get<{
      data: IAppointmentCard[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams}`);
    return response.data;
  },

  getAppointmentPageDetailsById: async(appointmentId: string): Promise<AppointmentPageDetails> => {
    const response = await api.get<{data: AppointmentPageDetails}>(`${BASE_URL}/id/${appointmentId}`)
    return response.data.data
  },

  getFeedbackByAppointmentId: async(
      appointmentId: string
    ): Promise<IFeedback> => {
      const response = await api.get<{ data: IFeedback }>(`${BASE_URL}/${appointmentId}/feedback`)
      return response.data.data
    }
};
