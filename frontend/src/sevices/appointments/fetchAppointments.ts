import { IFetchAllAppointmentResponse, IFetchAppointmentResponse } from "../../types/appointment/fetchAppointments";
import { api } from "../../utils/axiosInstance";

export const fetchAppointmentDetailsApi = async (page: string, skip: number, limit: number): Promise<{ appointments: IFetchAppointmentResponse[], total: number }> => {
    const { data } = await api.get<{ appointments: IFetchAppointmentResponse[], total: number }>('/api/appointment/get-appointments', {
        params: { page, skip, limit }
    });
    return data;
}

export const fetchAllAppointmentDetailsApi = async ({page,
    limit,
    searchTerm,
    selectedDate,
    selectedTime,
    statusFilter}: {
        page: number;
        limit: number;
        searchTerm: string;
        selectedDate: string;
        selectedTime: string;
        statusFilter: string}): Promise<{appointments: IFetchAllAppointmentResponse[],totalAppointments: number}> => {
    const response = await api.get<{appointments: IFetchAllAppointmentResponse[],totalAppointments: number}>(`/api/appointment/get-appointments-admin`, {
                    params: {
                        page,
                        limit,
                        searchTerm,
                        selectedDate,
                        selectedTime,
                        statusFilter,
                    },
                });
    return response.data;
}

export const fetchAppointmentDetailsDashboardApi = async (): Promise<{ profit: number, pending: number }> => {
    const response = await api.get<{ profit: number, pending: number }>('/api/appointment/appointment-details');
    return response.data;
}
