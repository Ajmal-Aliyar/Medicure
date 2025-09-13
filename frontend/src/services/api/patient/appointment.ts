import { api } from "@/lib/axios";
import type {
  AppointmentDetailsPopulated,
  AppointmentPageDetails,
  IAppointmentCard,
  IAppointmentService,
} from "@/types/appointment";
import type { MetaType } from "@/types/common";
import type { IFeedback } from "@/types/feedback";

const BASE_URL = "/api/patient/appointment";
interface IPatientAppointmentService extends IAppointmentService {
  getAppointmentByRoomId(roomId: string): Promise<AppointmentDetailsPopulated>;
  cancelAppointment(
    appointmentId: string
  ): Promise<boolean>;
}

export const patientAppointmentService: IPatientAppointmentService = {
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


  getFeedbackByAppointmentId: async(
    appointmentId: string
  ): Promise<IFeedback> => {
    const response = await api.get<{ data: IFeedback }>(`${BASE_URL}/${appointmentId}/feedback`)
    return response.data.data
  },

  cancelAppointment: async(
    appointmentId: string
  ): Promise<boolean> => {
    const response = await api.patch<{data: boolean}>(`${BASE_URL}/${appointmentId}/cancel`)
    return response.data.data
  }
};
