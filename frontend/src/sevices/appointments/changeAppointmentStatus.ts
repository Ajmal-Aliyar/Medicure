import { api } from "../../utils/axiosInstance";

export const changeAppointmentStatusApi = async () => {
    const { data } = await api.get('/api/appointment/finish-consulting');
    return data;
}
