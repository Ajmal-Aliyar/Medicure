import { IFetchFeedbacks } from "../../types/feedback/feedback";
import { api } from "../../utils/axiosInstance"

export const createFeedbackApi = async ( doctorId: string, patientId: string, rating: number, comments:string ): Promise<{response: string}> => {
    const response = await api.post<{response: string}>(`/api/feedback/submit-feedback`, {doctorId, patientId, rating, comments});
    return response.data;
};

export const fetchFeedbacksApi = async (): Promise<{feedbackData: IFetchFeedbacks[]}> =>  {
    const response = await api.get<{feedbackData: IFetchFeedbacks[]}>('/api/feedback/fetch-feedback/user')
    return response.data
}