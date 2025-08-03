import { api } from "@/lib/axios";
import type { IDoctorSchedule } from "@/slices/doctorSlice";
import type { IWeeklySchedule } from "@/types/schedule";

const BASE_URL = "/api/doctor/schedule";

export const doctorScheduleService = {

    updateSchedule: async (weeklySchedule: IWeeklySchedule): Promise<IDoctorSchedule> => {
        const response = await api.post<{data: IDoctorSchedule}>(`${BASE_URL}/`, { weeklySchedule });
        return response.data.data
      },
}