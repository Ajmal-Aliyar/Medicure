import { IAuthResponseUser } from "@/interfaces";
export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  mobile: string;
  role: 'patient' | 'doctor';
}

export interface LoginDto {
  email: string;
  password: string;
  role: 'patient' | 'doctor' | "admin";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IAuthResponseUser;
}

export interface CreateUserDto {
  email: string;
  password: string;
  fullName?: string;
  mobile: string;
}
