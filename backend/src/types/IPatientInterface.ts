export interface IUpdateProfilePayload {
    _id: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    houseName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}


export interface ICreatePatient {
    fullName: string, email: string, phone?: number, password: string, profileImage?: string
}

export interface IGetProfilePayload {
    fullName: string;
    phone: string;
    email: string;
    dob: string;
    bloodGroup: string;
    gender: string;
    address: IPatientAddress
}

export interface IUpdateProfile {
    _id: string;
    dob: string;
    gender: string;
    bloodGroup: string;
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