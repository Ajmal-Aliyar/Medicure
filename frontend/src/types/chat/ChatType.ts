
export interface Message {
    id?: string;
    text: string;
    sender: 'me' | 'other';
    timestamp?: Date;
}

export interface IChat {
    participants: { _id: string }[],
    _id: string,
    name: string;
    avatar: string;
    lastMessage: string | null;
    unreadCount: number;
    messages: Message[]
}

export interface ChatContextType {
    chats: IChat[];
    addMessage: (message: any) => void;
    selectedChat: { chatId: string, messages: any } | null;
    selectChat: (chatId: string) => void;
}