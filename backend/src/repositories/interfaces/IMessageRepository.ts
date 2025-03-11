import mongoose from "mongoose";
import { IMessage } from "../../models/message/messageInterface";

export interface IMessageRepository {
    createMessage(messageData: Partial<IMessage>): Promise<IMessage>;
    getMessagesByChatId(chatId: mongoose.Types.ObjectId, limit?: number): Promise<IMessage[]>;
    updateMessage(messageId: string, updates: Partial<IMessage>): Promise<IMessage | null>;
    deleteMessage(messageId: string): Promise<boolean>;
    markMessageAsSeen(messageId: string, userId: string): Promise<IMessage | null>;
}
