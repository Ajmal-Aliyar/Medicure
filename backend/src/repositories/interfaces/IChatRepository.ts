import mongoose from "mongoose";
import { IChat } from "../../models/chat/chatInterface";

export interface IChatRepository {
    createChat(participants: mongoose.Types.ObjectId[], isGroup?: boolean, groupName?: string | null, groupIcon?: string | null): Promise<IChat>;
    getChatById(chatId: mongoose.Types.ObjectId): Promise<IChat | null>;
    getChatByUserId(userId: mongoose.Types.ObjectId): Promise<IChat[] | null>
    getUserChats(userId: mongoose.Types.ObjectId, role: string): Promise<IChat[]>;
    updateLastMessage(chatId: mongoose.Types.ObjectId, messageId: mongoose.Types.ObjectId): Promise<IChat | null>;
    deleteChat(chatId: mongoose.Types.ObjectId): Promise<void>;
    isChatExists({ patientId, doctorId }: IIsChatExists): Promise<boolean>
    incrementUnreadCount(chatId: mongoose.Types.ObjectId, recipientId: mongoose.Types.ObjectId): Promise<void>
    markMessagesAsRead(chatId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<void>
}

export interface IIsChatExists {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
}