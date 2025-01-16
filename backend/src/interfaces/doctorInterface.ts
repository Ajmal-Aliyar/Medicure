export interface ICreateUser {
    fullName: string, email: string, phone: number, password: string
}

export interface IProfileVerificationRequestBody {
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: string;
    degree: string;
    university: string;
    yearOfCompletion: string;
    yearsOfExperience: string;
}

export interface IProfileVerificationInput {
    _id: string;
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: string;
    degree: string;
    university: string;
    yearOfCompletion: string;
    yearsOfExperience: string;
}

export interface IUpdateProfileRepository { 
    addressLine: string; 
    streetAddress: string; 
    city: string; 
    state: string; 
    country: string; 
    pincode: string; 
    about: string; 
    headline: string; 
    fullName: string; 
}