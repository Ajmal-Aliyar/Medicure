import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    doctorId: null | string;
    patientId: null | string;
    roomId: null | string;
    appointmentId: null | string;
}
const initialState: InitialState = {
    doctorId: null,
    patientId: null,
    roomId: null,
    appointmentId: null
}

const consultationSlice = createSlice({
    name: "consultation",
    initialState,
    reducers: {
        setConsultationData(
            state,
            action: PayloadAction<InitialState>
        ) {
            state.doctorId = action.payload.doctorId;
            state.patientId = action.payload.patientId;
            state.roomId = action.payload.roomId;
            state.appointmentId = action.payload.appointmentId;
        }
    }
});


export const { setConsultationData } = consultationSlice.actions;
export default consultationSlice.reducer;