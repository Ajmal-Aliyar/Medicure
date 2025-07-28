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

