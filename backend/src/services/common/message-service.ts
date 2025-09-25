import { inject, injectable } from "inversify";
import { IConversationService, IMessageService } from "../interfaces";
import { TYPES } from "@/di/types";
import { IMessageRepository } from "@/repositories";
import { Types } from "mongoose";
import { IPagination } from "@/interfaces";
import { ForbiddenError } from "@/errors";
import { MessageDTO } from "@/dtos/message-dtos";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.MessageRepository) private readonly _messageRepo: IMessageRepository,
    @inject(TYPES.ConversationService) private readonly _conversationService: IConversationService,
  ) {}

  async createMessage( data: MessageDTO): Promise<void> {
    await this._messageRepo.create(data)
    await this._conversationService.updateLastMessage( data.conversationId?.toString(), data.content, data.createdAt)
  }

  async getMessages(
  candidateId: string,
  conversationId: string,
  pagination: IPagination
): Promise<{ data: MessageDTO[], total: number}> {
  const isMember = await this._conversationService.isMember(candidateId, conversationId);
  
  if (!isMember) {
    throw new ForbiddenError("You are not a member of this conversation.");
  }

  const filter = { conversationId: new Types.ObjectId(conversationId) };

  return this._messageRepo.findAll({
    filter,
    ...pagination,
    sort: { createdAt: -1 },
  });
}

}
