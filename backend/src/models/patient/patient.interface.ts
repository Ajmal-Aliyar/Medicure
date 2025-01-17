export interface IPatient {
    fullName: string;
    phone: number;
    email: string;
    password: string;
    dob?: Date;
    gender?: 'Male' | 'Female';
    medicalHistory?: unknown[]; 
    houseName?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

