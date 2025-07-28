import { inject, injectable } from "inversify";
import { IConversationService, IMessageService } from "../interfaces";
import { TYPES } from "@/di/types";
import { IMessageRepository } from "@/repositories";
import { IMessage } from "@/models";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.MessageRepository) private readonly messageRepo: IMessageRepository,
    @inject(TYPES.ConversationService) private readonly conversationService: IConversationService,
  ) {}

  async createMessage( data: IMessage): Promise<void> {
    await this.messageRepo.create(data)
    await this.conversationService.updateLastMessage( data.conversationId?.toString(), data.content, data.createdAt)
  }

  async getMessages( candidateId: string, conversationId: string) {
    await this.conversationService.
  }
}
