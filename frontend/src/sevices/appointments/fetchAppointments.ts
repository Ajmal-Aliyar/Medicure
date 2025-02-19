import { IFetchAllAppointmentResponse, IFetchAppointmentResponse } from "../../types/appointment/fetchAppointments";
import { api } from "../../utils/axiosInstance";

export const fetchAppointmentDetailsApi = async (): Promise<{userAppointmentsList: IFetchAppointmentResponse[]}> => {
    const { data } = await api.get<{userAppointmentsList: IFetchAppointmentResponse[]}>('/api/appointment/get-appointments');
    return data;
}

export const fetchAllAppointmentDetailsApi = async (): Promise<{userAppointmentsList: IFetchAllAppointmentResponse[]}> => {
    const response = await api.get<{userAppointmentsList: IFetchAllAppointmentResponse[]}>('/api/appointment/get-appointments-admin');
    return response.data;
}
