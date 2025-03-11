import mongoose from "mongoose";
import { IMessage } from "../../models/message/messageInterface";
import { Message } from "../../models/message/messageSchema";
import { IMessageRepository } from "../interfaces/IMessageRepository";


export class MessageRepository implements IMessageRepository {
    async createMessage(messageData: Partial<IMessage>): Promise<IMessage> {
        const message = new Message(messageData);
        return await message.save();
    }

    async getMessagesByChatId(chatId: mongoose.Types.ObjectId, limit: number = 50): Promise<IMessage[]> {
        console.log(chatId,'dhad')
        return await Message.find({ chatId }).sort({ timestamp: 1 }).limit(limit);
    }

    async updateMessage(messageId: string, updates: Partial<IMessage>): Promise<IMessage | null> {
        return await Message.findByIdAndUpdate(messageId, updates, { new: true });
    }

    async deleteMessage(messageId: string): Promise<boolean> {
        const result = await Message.findByIdAndDelete(messageId);
        return result !== null;
    }

    async markMessageAsSeen(messageId: string, userId: string): Promise<IMessage | null> {
        return await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { seenBy: userId } },
            { new: true }
        );
    }
}
