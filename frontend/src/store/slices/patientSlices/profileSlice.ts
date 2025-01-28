import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPatientProfile } from '../../../types/patient/profileType';


const initialState: IPatientProfile = {
    profileImage: 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1737173758/sk7hria3ngkaujeywrjy.png',
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    address: {
        houseName: '',
        street: '',
        state: '',
        city: '',
        country: '',
        pincode: ''
    },
    _id: '',
    medicalHistory: [],
    isBlocked: false
};

const patientProfile = createSlice({
    name: 'patient-profile',
    initialState,
    reducers: {
        setPatientProfileData: (state, action: PayloadAction<Partial<IPatientProfile>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export default patientProfile.reducer;
export const { setPatientProfileData } = patientProfile.actions;
