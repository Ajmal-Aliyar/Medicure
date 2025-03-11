import { IMessage } from "../../models/message/messageInterface"
import { IChatId } from "./IChatServices"

export interface IMessageServices {
    createMessage(data): Promise<void>
    getMessagesByChatId({ chatId }: IChatId): Promise<IMessage[]>
    updateMessage({ messageId, data }): Promise<IMessage>
    deleteMessage({ messageId }): Promise<void>
    markMessageAsSeen({ messageId, userId }): Promise<IMessage>
}