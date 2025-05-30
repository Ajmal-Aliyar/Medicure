import axios from 'axios';
import { ENV } from '../constants/env';

export function getAccessTokenFromCookie(): string | null {
  const match = document.cookie.match(/(^|;\s*)accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[2]) : null;
}

export const api = axios.create({
  baseURL: ENV.API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, 
});



// api.interceptors.request.use(
//   (config) => {
//     console.log('reeeqst send');
    
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.log('caught error');
//       window.location.href='/auth'
//     }

//     // if (error.response?.data.status === 'blocked') {
//     //   store.dispatch(blockUser())
//     // }

//     return Promise.reject(error);
//   }
// );
