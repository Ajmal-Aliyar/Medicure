export interface IPatientProfile {
    _id: string;
    profileImage: string;
    fullName: string;
    phone: string; 
    email: string;
    dob: string; 
    bloodGroup: string;
    gender: string;
    medicalHistory: string[];
    isBlocked: boolean;
    address: IPatientAddress; 
}
export interface IPatientAddress {
    houseName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface IPatientProfilePayload {
    profileImage: string;
    fullName: string;
    phone: string; 
    email: string;
    dob: string; 
    bloodGroup: string;
    gender: string;
    houseName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}