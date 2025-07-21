
export type IRole = "doctor" | "patient" | "admin";

export interface LoginPayload {
    email: string;
    password: string;
    role: IRole;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
    role: IRole;
}

export interface AuthUser {
    id: string;
    email: string;
    role: IRole;
    isApproved: "pending" | "applied" | "approved" | "rejected";
    fullName: string;
    profileImage?: string | null
}