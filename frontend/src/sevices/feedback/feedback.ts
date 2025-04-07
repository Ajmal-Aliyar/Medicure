import { IFetchFeedbacks } from "../../types/feedback/feedback";
import { api } from "../../utils/axiosInstance"

export const createFeedbackApi = async ( doctorId: string, appointmentId: string, patientId: string, rating: number, comments:string ): Promise<{response: string}> => {
    const response = await api.post<{response: string}>(`/api/feedback/submit-feedback`, { doctorId, appointmentId, patientId, rating, comments});
    return response.data;
};

export const fetchFeedbacksApi = async (
    role: string,
    skip: number, 
    limit: number
  ): Promise<{ feedbacks: IFetchFeedbacks[], total: number }> => {  
      const response = await api.get<{ feedbacks: IFetchFeedbacks[], total: number }>(
        `/api/feedback/fetch-feedback/${role}`, {
          params: {
            skip, limit
          }
        }
      );
      return response.data;
  };


  export const fetchFeedbacksAdminApi = async (
    pageNumber: number, 
    limit: number
  ): Promise<{ feedbackData: IFetchFeedbacks[] }> => {  
      const response = await api.get<{ feedbackData: IFetchFeedbacks[] }>(
        `/api/feedback/fetch-feedback/admin?page=${pageNumber}&limit=${limit}`
      );
      return response.data;
  };

  