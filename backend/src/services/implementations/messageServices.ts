import { IMessage } from "../../models/message/messageInterface";
import { IChatRepository } from "../../repositories/interfaces/IChatRepository";
import { IMessageRepository } from "../../repositories/interfaces/IMessageRepository";
import { producer } from "../../utils/kafkaUtil";
import { incrementUnreadCount } from "../../utils/socket";
import { IChatId } from "../interfaces/IChatServices";
import { IMessageServices } from "../interfaces/IMessageServices";

export class MessageServices implements IMessageServices {
  private messageRepository: IMessageRepository;
  private chatRepository: IChatRepository;

  constructor(
    messageRepository: IMessageRepository,
    chatRepository: IChatRepository
  ) {
    this.messageRepository = messageRepository;
    this.chatRepository = chatRepository;
  }

  async createMessage(data, _id: string): Promise<void> {
    try {
      await producer.send({
        topic: "chat-messages",
        messages: [{ value: JSON.stringify(data) }],
      });
      await this.chatRepository.incrementUnreadCount(
        data.chatId,
        data.senderId
      );
      const { participants } = await this.chatRepository.getChatById(
        data.chatId
      );
      incrementUnreadCount(_id, participants);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMessagesByChatId({ chatId }: IChatId): Promise<IMessage[]> {
    try {
      const messages = await this.messageRepository.getMessagesByChatId(chatId);
      return messages;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateMessage({ messageId, data }): Promise<IMessage> {
    try {
      const updatedMessage = await this.messageRepository.updateMessage(
        messageId,
        data
      );
      if (!updatedMessage) {
        throw new Error("Message not found");
      }
      return updatedMessage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMessage({ messageId }): Promise<void> {
    try {
      const deleted = await this.messageRepository.deleteMessage(messageId);
      if (!deleted) {
        throw new Error("Message not found");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async markMessageAsSeen({ messageId, userId }): Promise<IMessage> {
    try {
      const updatedMessage = await this.messageRepository.markMessageAsSeen(
        messageId,
        userId
      );
      if (!updatedMessage) {
        throw new Error("Message not found");
      }
      return updatedMessage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
