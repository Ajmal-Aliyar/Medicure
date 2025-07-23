import type { IConversationDetails } from "@/types/conversation";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

 interface InitialState {
    chat: IConversationDetails | null
 }

const initialState: InitialState = {
    chat: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectChat( state,
            action: PayloadAction<InitialState>) {
                state.chat = action.payload.chat
        }
    }
})

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;