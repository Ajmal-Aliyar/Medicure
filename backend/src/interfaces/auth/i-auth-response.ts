export interface IAuthResponseUser {
    id: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    isApproved: "pending" | "applied" | "approved" | "rejected";
    fullName: string;
    profileImage: string | null;
    isBlocked?: boolean;
}