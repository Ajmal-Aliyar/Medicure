import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    roomId: string | null
    candidates: ICandidate[]
    patientId: string | null
}

export interface ICandidate {
    id: string;
    socketId: string;
    roomId: string;
}

const initialState: IInitialState = {
    roomId: null,
    candidates: [],
    patientId: null
}

const videoConsultSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setRoomId: (state, action:PayloadAction<string>) => {
            state.roomId = action.payload;
        },
        setCanditates: (state, action:PayloadAction<{candidates:ICandidate[]}>) => {
            state.candidates = action.payload.candidates
        },
        setPatientId: (state, action: PayloadAction<string>) => {
            state.patientId = action.payload
        },
    }
})

export const { setRoomId, setCanditates, setPatientId } = videoConsultSlice.actions
export default videoConsultSlice.reducer 