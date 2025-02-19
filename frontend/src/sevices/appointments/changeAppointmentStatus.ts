import { api } from "../../utils/axiosInstance";

export const changeAppointmentStatusApi = async (appointmentId: string, slotId: string) => {
    console.log(appointmentId, slotId)
    const response = await api.get(`/api/appointment/finish-consulting/${appointmentId}/${slotId}`);
    return response;
}
