import notification from './slices/commonSlices/notificationSlice'
import doctorProfile from './slices/doctorSlices/profileSlice'
import slotReducer from './slices/doctorSlices/slotSlice';
import authReducer from './slices/authSlices/AuthSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    slot: slotReducer,
    auth: authReducer,
    doctor: doctorProfile,
    notification: notification
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
