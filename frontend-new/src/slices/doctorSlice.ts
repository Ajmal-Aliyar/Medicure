import type { IGender } from '@/types/common';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  gender: IGender | null;
  profileImage: string;
  dob: string;
  registrationNumber: string;
  about: string;
  educations: IEducation[];
  experiences: IExperience[];
  headline: string;
  address: IAddress;
  specialization: string;
  experience: number;
  languageSpoken: string[];
  fees: number;
  isBlocked: boolean;
  isProfileCompleted: boolean;
  isApproved: boolean;
  rating:  {
    average: number,
    reviewCount: number
  };
}

export type ShiftType = 'consult' | 'emergency';

export interface IShift {
  startTime: string;
  endTime: string;
  type: ShiftType;
  duration: number;
  fees: number;
  buffer: number;
  isActive: boolean;
}

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type IWeeklySchedule = {
  [key in Day]?: {
    shifts: IShift[];
  };
};

export interface IDoctorSchedule {
  doctorId: string;
  weeklySchedule: IWeeklySchedule;
  autoApprove: boolean;
  advanceBooking: number;
  timezone: string;
  lastUpdated?: Date;
  version?: number;
  isActive?: boolean;
}

const defaultProfile: ProfileState = {
  id: '',
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  gender: null,
  profileImage: '',
  dob: '',
  registrationNumber: '',
  about: '',
  educations: [],
  experiences: [],
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
  experience: 0,
  languageSpoken: [],
  fees: 0,
  isBlocked: false,
  isProfileCompleted: false,
  isApproved: false,
  rating: {
    average: 0,
    reviewCount: 0
  }
};

const defaultSchedule: IDoctorSchedule = {
  doctorId: '',
  weeklySchedule: {},
  autoApprove: true,
  advanceBooking: 7,
  timezone: 'Asia/Kolkata',
  isActive: true,
  lastUpdated: new Date(),
  version: 1
};

interface DoctorState {
  doctor: ProfileState;
  schedule: IDoctorSchedule;
}

const initialState: DoctorState = {
  doctor: defaultProfile,
  schedule: defaultSchedule
};


const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState,
  reducers: {
    updateDoctorProfile(state, action: PayloadAction<Partial<ProfileState>>) {
      state.doctor = {
        ...state.doctor,
        ...action.payload
      };
    },
    updateDoctorSchedule(state, action: PayloadAction<Partial<IDoctorSchedule>>) {
      state.schedule = {
        ...state.schedule,
        ...action.payload
      };
    },
    resetDoctorProfile(state) {
      state.doctor = defaultProfile;
    },
    resetDoctorSchedule(state) {
      state.schedule = defaultSchedule;
    }
  }
});


export const {
  updateDoctorProfile,
  updateDoctorSchedule,
  resetDoctorProfile,
  resetDoctorSchedule
} = doctorProfileSlice.actions;

export default doctorProfileSlice.reducer;
