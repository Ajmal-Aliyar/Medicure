import { api } from "../../utils/axiosInstance"
import { IPayment } from "./IPayment";

export const createCheckoutSessionApi = async ({
    doctorName,
    specialization,
    startTime,
    endTime,
    duration,
    fees,
}: IPayment): Promise<{ sessionUrl: string }> => {
    const response = await api.post<{ sessionUrl: string }>('/api/payment/create-checkout-session', {
        doctorName,
        specialization,
        startTime,
        endTime,
        duration,
        fees,
    });
    return response.data;
};