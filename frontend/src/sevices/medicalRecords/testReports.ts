import { api } from "../../utils/axiosInstance";

export interface ITestReport {
    fileUrl: string;
    testType: string;
    uploadedAt: string;
}

export const fetchTestReportsApi = async ( patientId: string, skip: number, limit: number ): Promise<{ testReport: ITestReport[], total: number }> => {
    const response = await api.get<{ testReport: ITestReport[], total: number }>(`/api/report/${patientId}`,{
        params: { skip, limit },
      });
    return response.data;
};