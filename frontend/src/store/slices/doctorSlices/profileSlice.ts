import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEducation {
    degree: string;
    university: string;
    yearOfCompletion: number;
}

export interface IExperience {
    place: string;
    year: string;
    experience: number;
}

export interface IAddress {
    addressLine: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface ProfileState {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    gender: 'Male' | 'Female' | '';
    profileImage: string;
    dob:  '';
    registrationNumber: string;
    about: string;
    educationDetails: IEducation;
    education: IEducation[];
    experience: IExperience[];
    headline: string;
    address: IAddress;
    specialization: string;
    yearsOfExperience: number;
    languageSpoken: string[];
    fees: number;
    isBlocked: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
    rating: number;
}

const initialState: ProfileState = {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    gender: '',
    profileImage: '',
    dob: '',
    registrationNumber: '',
    about: '',
    educationDetails: {
        degree: '',
        university: '',
        yearOfCompletion: 0
    },
    education: [],
    experience: [],
    headline: '',
    address: {
        addressLine: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    },
    specialization: '',
    yearsOfExperience: 0,
    languageSpoken: [],
    fees: 0,
    isBlocked: false,
    isProfileCompleted: false,
    isApproved: false,
    rating: 0
};

const doctorProfile = createSlice({
    name: 'doctor-profile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<Partial<ProfileState>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export default doctorProfile.reducer;
export const { setProfileData } = doctorProfile.actions;
