import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    roomId: string | null
    candidates: ICandidate[]
}

export interface ICandidate {
    id: string;
    socketId: string;
    roomId: string;
}

const initialState: IInitialState = {
    roomId: null,
    candidates: []
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
        }
    }
})

export const { setRoomId, setCanditates } = videoConsultSlice.actions
export default videoConsultSlice.reducer 