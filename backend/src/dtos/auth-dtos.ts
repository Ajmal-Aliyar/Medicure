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

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: IAuthResponseUser;
}

export interface AuthResponseUserDTO {
    id: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    isApproved: "pending" | "applied" | "approved" | "rejected";
    fullName: string;
    profileImage: string | null;
    isBlocked?: boolean;
}
export interface CreateUserDto {
  email: string;
  password: string;
  fullName?: string;
  mobile: string;
}
