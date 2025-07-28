import type { PatientProfile } from "@/types/patient";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: PatientProfile = {
  personal: {
    profileImage:
      "https://res.cloudinary.com/dwyxogyrk/image/upload/v1737173758/sk7hria3ngkaujeywrjy.png",
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: '',
    bloodGroup: "",
  },

  contact: {
    address: {
      addressLine: "",
      street: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
  },
  id: "",

  status: {
    isBlocked: false,
    isVerified: false,
    isProfileCompleted: false,
    isApproved: true,
  },
};

const patientProfile = createSlice({
  name: "patient-profile",
  initialState,
  reducers: {
    setProfileData: (
      state,
      action: PayloadAction<PatientProfile>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export default patientProfile.reducer;
export const { setProfileData } = patientProfile.actions;
