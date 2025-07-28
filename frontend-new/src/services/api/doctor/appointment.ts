import { api } from "@/lib/axios";
import type {
  AppointmentDetailsPopulated,
  AppointmentPageDetails,
  IAppointmentCard,
  IAppointmentService,
} from "@/types/appointment";
import type { MetaType } from "@/types/common";
import type { IFeedback } from "@/types/feedback";

const BASE_URL = "/api/doctor/appointment";

interface IDoctorAppointmentService extends IAppointmentService {
  getAppointmentByRoomId(roomId: string): Promise<AppointmentDetailsPopulated>;
  markAppointmentAsCompleted(roomId: string): Promise<void>
}

export const doctorAppointmentService: IDoctorAppointmentService = {
  getAllAppointments: async (
    queryParams: URLSearchParams
  ): Promise<{ data: IAppointmentCard[]; meta: MetaType }> => {
    const response = await api.get<{
      data: IAppointmentCard[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams}`);
    return response.data;
  },

  getAppointmentByRoomId: async (
    roomId: string
  ): Promise<AppointmentDetailsPopulated> => {
    const response = await api.get<{ data: AppointmentDetailsPopulated }>(
      `${BASE_URL}/room/${roomId}`
    );
    return response.data.data;
  },

  getAppointmentPageDetailsById: async (
    appointmentId: string
  ): Promise<AppointmentPageDetails> => {
    const response = await api.get<{ data: AppointmentPageDetails }>(
      `${BASE_URL}/id/${appointmentId}`
    );
    return response.data.data;
  },

  markAppointmentAsCompleted: async (roomId: string) => {
    await api.patch(`${BASE_URL}/${roomId}/mark-completed`);
  },

  getFeedbackByAppointmentId: async(
      appointmentId: string
    ): Promise<IFeedback> => {
      const response = await api.get<{ data: IFeedback }>(`${BASE_URL}/${appointmentId}/feedback`)
      return response.data.data
    }
};
