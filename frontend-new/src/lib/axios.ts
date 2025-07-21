import axios from "axios";
import { env } from "./env";
import { showError } from "./toast";
import type { AuthUser } from "@/types/auth";
import { loginSuccess } from "@/slices/authSlice";
import { store } from "@/app/store";
import { setLoading } from "@/slices/globalSlice";

export const api = axios.create({
  baseURL: env.API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error?.response?.data?.message || error.message || "Unexpected error occurred";
    const isRefreshEndpoint = originalRequest.url?.includes("/api/auth/refresh-token");

    if (status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
      originalRequest._retry = true;
      try {
        const { data: response } = await api.post<{ data: AuthUser }>("/api/auth/refresh-token");
        store.dispatch(loginSuccess({ user: response.data }));
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (!(status === 401 && isRefreshEndpoint) && !(status === 401 && originalRequest._retry)) {
      console.log("error occurred", message);
      showError(message);
    }

    store.dispatch(setLoading(false))

    return Promise.reject(error);
  }
);
