import { ISignInResponse } from "../../types/authType"
import { api } from "../../utils/axiosInstance"

export const signInApi = async (email: string, password: string, role: string): Promise<ISignInResponse> => {
    return await api.post('/api/admin/sign-in',{ email, password, role})
}