import { blockUser } from "../store/slices/commonSlices/AuthSlice";
import store from "../store/store";
import { api } from "./axiosInstance";

export const setupInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log('caught error');
        window.location.href = '/auth';
      }

      if (error.response?.data?.status === 'blocked') {
        store.dispatch(blockUser());
        console.log('User blocked, dispatched to store');
      }

      return Promise.reject(error);
    }
  );
};
