import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/slices/authSlice';
import modalReducer from '@/slices/modalSlice';
import globalReducer from '@/slices/globalSlice';
import doctorReducer from '@/slices/doctorSlice';
import patientReducer from '@/slices/patientSlice';
import consultationReducer from '@/slices/consultationSlice';
import chatSliceReducer from '@/slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    global: globalReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    consultation: consultationReducer,
    chat: chatSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
