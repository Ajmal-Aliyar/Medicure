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
    const response = await api.post<{message: string}>('/api/payment/refund', {transactionId})
    return response.data
}

export const requestWithdrawalApi =  async (doctorId: string, amount: number): Promise<{message:string}> => {
    const response = await api.post<{message: string}>('/api/payment/request-withdraw', {doctorId, amount})
    return response.data
}

export const approveWithdrawalApi =  async (transactionId: string): Promise<{message:string}> => {
    const response = await api.get<{message: string}>('/api/payment/approve-withdraw', { params: { transactionId }})
    return response.data
}