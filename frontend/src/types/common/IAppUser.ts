export interface AppUser { 
    id: string; 
    fullName: string; 
    profileImage: string | null; 
    email: string; 
    role: string; 
    isApproved: null | "pending" | "applied" | "approved" | "rejected";
}