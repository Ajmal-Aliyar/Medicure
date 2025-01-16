import { Dispatch, SetStateAction } from "react";


export interface IEditProfileSectionProps {
    doctor: IDoctor;
    setEditProfile: Dispatch<SetStateAction<boolean>>;
}

export interface IDoctorTopProfile {
    doctor: IDoctor;
    setEditProfile: Dispatch<SetStateAction<boolean>>;
}

export interface IDoctor {
    fullName: string;
    headline: string;
    about: string;
    address: IAddress;
}

export interface IAddress {
    addressLine: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}