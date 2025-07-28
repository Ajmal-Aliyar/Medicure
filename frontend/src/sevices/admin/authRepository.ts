import { ISignInResponse } from "../../types/authType"
import { api } from "../../utils/axiosInstance"

export const signInApi = async (email: string, password: string, role: string): Promise<ISignInResponse> => {
    const response = await api.post<ISignInResponse>('/api/auth/login',{ email, password, role})
    return response.data
}