import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../../types/chat/ChatType";

interface ChatState {
  chats: IChat[];
  selectedChat: { chatId: string; messages: IMessage[], profileImage: string, name: string } | null;
  trigger: boolean
}
export interface IMessage {
    _id: string;
  content: string, senderId: string, chatId: string
}
const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  trigger: false
};


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
        state.chats = action.payload
    },
    setSelectedChat: (state, action: PayloadAction<{ chatId: string; messages: IMessage[], profileImage: string, name: string }>) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      if (state.selectedChat && state.selectedChat.chatId === action.payload.chatId) {
        state.selectedChat.messages.push(action.payload);
      }
    },
    trigger: (state) => {
      state.trigger = !state.trigger
    }
  }
});

export const { setSelectedChat, addMessage, setChats, trigger } = chatSlice.actions;
export default chatSlice.reducer;
