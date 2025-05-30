export interface IAuthResponseUser {
    id: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    isApproved: boolean;
    fullName: string;
    profileImage: string | null
}