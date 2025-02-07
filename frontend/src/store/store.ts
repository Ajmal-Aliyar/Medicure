import manageDoctor from './slices/adminSlices/manageDoctorSlice';
import notification from './slices/commonSlices/notificationSlice'
import patientProfile from './slices/patientSlices/profileSlice'
import doctorProfile from './slices/doctorSlices/profileSlice'
import slotReducer from './slices/doctorSlices/slotSlice';
import authReducer from './slices/commonSlices/AuthSlice';
import { configureStore } from '@reduxjs/toolkit';
import videoConsultReducer from './slices/commonSlices/videoConsultSlice'
const store = configureStore({
  reducer: {
    slot: slotReducer,
    auth: authReducer,
    doctor: doctorProfile,
    patient: patientProfile,
    videoConsult: videoConsultReducer,
    notification,
    manageDoctor
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
