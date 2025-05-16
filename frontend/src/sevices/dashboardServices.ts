import { api } from "../utils/axiosInstance";

export const getPatientDashboardApi = async (): Promise<{
  totalUsers: number;
  activePatients: number;
  blockedPatients: number;
  appointments: number;
}> => {
  const response = await api.get<{
    totalUsers: number;
    activePatients: number;
    blockedPatients: number;
    appointments: number;
  }>(`/api/dashboard/patient`);
  return response.data;
};

export const getChartDetailsApi = async (): Promise<{
    'Last 7 Days': { date: string; appointments: number; revenue: number }[];
    'Last 30 Days': { date: string; appointments: number; revenue: number }[];
  }> => {
    const response = await api.get<{
        'Last 7 Days': { date: string; appointments: number; revenue: number }[];
        'Last 30 Days': { date: string; appointments: number; revenue: number }[];
      }>(`/api/dashboard/chart-details`);
    return response.data;
  };
