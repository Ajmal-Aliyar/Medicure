import notification from './slices/commonSlices/notificationSlice'
import doctorProfile from './slices/doctorSlices/profileSlice'
import patientProfile from './slices/patientSlices/profileSlice'
import slotReducer from './slices/doctorSlices/slotSlice';
import authReducer from './slices/commonSlices/AuthSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    slot: slotReducer,
    auth: authReducer,
    doctor: doctorProfile,
    patient: patientProfile,
    notification: notification
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
