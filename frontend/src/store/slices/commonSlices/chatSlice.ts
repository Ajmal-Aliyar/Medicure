import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../../types/chat/ChatType";

interface ChatState {
  chats: IChat[];
  selectedChat: { chatId: string; messages: any, profileImage: string, name: string } | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
};


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
        state.chats = action.payload
    },
    setSelectedChat: (state, action: PayloadAction<{ chatId: string; messages: any, profileImage: string, name: string }>) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      if (state.selectedChat && state.selectedChat.chatId === action.payload.chatId) {
        state.selectedChat.messages.push(action.payload);
      }
    },
  }
});

export const { setSelectedChat, addMessage, setChats } = chatSlice.actions;
export default chatSlice.reducer;
