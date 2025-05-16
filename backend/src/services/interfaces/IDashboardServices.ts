export interface IDashboardServices {
  getPatientDashboard(): Promise<{
    totalUsers: number;
    activePatients: number;
    blockedPatients: number;
    appointments: number;
  }>;

  getChartDetails(): Promise<{
    "Last 7 Days": { date: string; appointments: number; revenue: number }[];
    "Last 30 Days": { date: string; appointments: number; revenue: number }[];
  }>;
}
