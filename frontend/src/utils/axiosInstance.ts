import axios from 'axios';
import { ENV } from '../constants/env';

export const api = axios.create({
  baseURL: ENV.API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});

export function getAccessTokenFromCookie(): string | null {
  const match = document.cookie.match(/(^|;\s*)accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.log('caught error');
//       window.location.href='/auth'
//     }

//     if (error.response?.data.status === 'blocked') {
//       store.dispatch(blockUser())
//     }

//     return Promise.reject(error);
//   }
// );
