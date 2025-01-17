import { Dispatch, SetStateAction } from "react";


export interface IEditProfileSectionProps {
    setEditProfile: Dispatch<SetStateAction<string>>;
}

export interface IDoctorTopProfile {
    setEditProfile: Dispatch<SetStateAction<string>>;
}

export interface ISLots {
    setEditProfile: Dispatch<SetStateAction<string>>;
}

export interface IImageUploader {
    profileImage: string;
    setEditProfile: Dispatch<SetStateAction<string>>;
}

export interface IEditProfilePortalProps {
  onClose: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
};


export interface IDoctor {
    fullName: string;
    headline: string;
    about: string;
    address: IAddress;
    profileImage: string;
}

export interface IAddress {
    addressLine: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}