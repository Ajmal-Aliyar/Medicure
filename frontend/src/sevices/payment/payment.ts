import { api } from "../../utils/axiosInstance"
import { IPayment } from "./IPayment";

export const createCheckoutSessionApi = async ({
    doctorName,
    specialization,
    startTime,
    endTime,
    duration,
    fees,
    doctorId,
    patientId,
    slotId,
    appointmentDate
}: IPayment): Promise<{ sessionUrl: string }> => {
    const response = await api.post<{ sessionUrl: string }>('/api/payment/create-checkout-session', {
        doctorName,
        specialization,
        startTime,
        endTime,
        duration,
        fees,
        doctorId,
        patientId,
        slotId,
        appointmentDate
    });
    return response.data;
};


export const refundApi =  async (transactionId: string): Promise<{message:string}> => {
    console.log(transactionId,'dsf')
    const response = await api.post<{message: string}>('/api/payment/refund', {transactionId})
    return response.data
}


