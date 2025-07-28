import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  globalLoading: boolean;
  appointmentId: string | null;
  prescription: { isOpen: boolean; prescriptionId: string | null };
  feedback: { appointmentId: string | null; feedbackId: string | null };
}

const initialState: GlobalState = {
  globalLoading: false,
  appointmentId: null,
  feedback: {
    appointmentId: null,
    feedbackId: null,
  },
  prescription: {
    isOpen: false,
    prescriptionId: null,
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setAppointment: (state, action: PayloadAction<string | null>) => {
      state.appointmentId = action.payload;
    },
    setPrescription: (state, action: PayloadAction<{prescriptionId: string | null, isOpen: boolean}>) => {
      state.prescription = { ...action.payload };
    },
    setFeedback: (
      state,
      action: PayloadAction<{
        appointmentId: string | null;
        feedbackId: string | null;
      }>
    ) => {
      state.feedback = { ...action.payload };
    },
    clearFeedback: (state) => {
      state.feedback = { feedbackId: null, appointmentId: null };
    },
  },
});

export const {
  setLoading,
  setAppointment,
  setFeedback,
  clearFeedback,
  setPrescription,
} = globalSlice.actions;
export default globalSlice.reducer;
