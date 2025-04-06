import { api } from "../../utils/axiosInstance"

export interface IWithdrawRequests {
    _id: string;
    amount: number;
    updatedAt: string;
    status: string;
    doctorDetails: {
        fullName: string;
        profileImage: string;
        specialization: string;
    }
}

export interface IWithdrawRequestPayload {
    recieverId: string;
    accountNumber: string;
    accountName: string;
    IFSC_Code: string;
    role: 'doctor' | 'admin';
    amount: number;
}

export const createWithdrawRequestApi = async (
    data: IWithdrawRequestPayload
): Promise<{ message: string }> => {
    const response = await api.post<{ ok: boolean; message: string }>('/api/withdraw', data)
    return response.data
}

export const fetchWithdrawRequestsApi = async (
    status: string, skip: number, limit: number
): Promise<{ withdrawRequests: IWithdrawRequests[], total: number }> => {
    const response = await api.get<{ withdrawRequests: IWithdrawRequests[], total: number }>('/api/withdraw', {
        params: { status, skip, limit }
    })
    return response.data
}

export const fetchWithdrawRequestsByUserApi = async (
    status: string, skip: number, limit: number
): Promise<{ withdrawRequests: IWithdrawRequests[], total: number }> => {
    const response = await api.get<{ withdrawRequests: IWithdrawRequests[], total: number }>('/api/withdraw/user', {
        params: { status, skip, limit }
    })
    return response.data
}

export const approveWithdrawRequestApi = async (
    id: string
): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>('/api/withdraw/approve', {}, {
        params: { id }
    })
    return response.data
}


export const cancelWithdrawRequestApi = async (
    id: string
): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>('/api/withdraw/cancel', {}, {
        params: { id }
    })
    return response.data
}
