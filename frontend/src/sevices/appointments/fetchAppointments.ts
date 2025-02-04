import { IFetchAppointmentResponse } from "../../types/appointment/fetchAppointments";
import { api } from "../../utils/axiosInstance";

export const fetchAppointmentDetailsApi = async (): Promise<{userAppointmentsList: IFetchAppointmentResponse[]}> => {
    const { data } = await api.get<{userAppointmentsList: IFetchAppointmentResponse[]}>('/api/appointment/get-appointments');
    return data;
}
