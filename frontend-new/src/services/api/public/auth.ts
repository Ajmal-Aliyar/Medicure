import { api } from "@/lib/axios";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

const BASE_URL = "/api/auth";

export const authService = {
  login: async (data: LoginPayload): Promise<AuthUser> => {
    const res = await api.post<{data: AuthUser}>(`${BASE_URL}/login`, data);
    return res.data.data;
  },

  register: async (data: RegisterPayload): Promise<{message: string, success: boolean}> => {
    const res = await api.post<{message: string, success: boolean}>(`${BASE_URL}/register`, data);
    return res.data;
  },

  me: async (): Promise<{ data: AuthUser, success: boolean }> => {
    const res = await api.get<{ data: AuthUser, success: boolean}>(`${BASE_URL}/me`);
    return res.data;
  },

  resendOTP: async (email: string): Promise<{ success: boolean }> => {
    const res = await api.post<{ success: boolean}>(`${BASE_URL}/resend-otp`, { email });
    return res.data;
  },

  verifyOtpAndRegister: async (otp: string, email: string): Promise<AuthUser> => {
    const res = await api.post<{ success: boolean, data: AuthUser}>(`${BASE_URL}/verify-otp`, { otp, email });
    return res.data.data;
  },

  logout: async (): Promise<{success: boolean }> => {
    const res = await api.post<{ success: boolean}>(`${BASE_URL}/logout`);
    return res.data;
  }
};
