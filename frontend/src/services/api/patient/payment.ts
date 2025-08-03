import { api } from "@/lib/axios";
const BASE_URL = "/api/patient/payment";

export const patientPaymentService = {
  checkoutSession: async ( slotId: string ): Promise<{ sessionUrl: string }> => {
    const response = await api.post<{data: { sessionUrl: string }}>(
      `${BASE_URL}/book-slot`, { slotId }
    );
    return response.data.data;
  },

  cancelCheckout: async ( slotId: string ): Promise<void> => {
    await api.post(
      `${BASE_URL}/cancel-checkout`, { slotId }
    );
  },

  fetchSessionDetails: async (sessionId: string): Promise<{data:{data:{metadata:{slotId: string}}}}> => {
    return await api.get<{data:{metadata:{slotId: string}}}>(`${BASE_URL}/session-details`, { params: {sessionId}});
  }
};
