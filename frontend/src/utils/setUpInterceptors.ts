import { api } from './axiosInstance';
import store from '../store/store';
import { login } from '../store/slices/commonSlices/AuthSlice';
import { ISignInResponse } from '../types/authType';

export const setupInterceptors = () => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const { data: response } = await api.post<ISignInResponse>("/api/auth/refresh-token");
          store.dispatch(login(response.data));
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};