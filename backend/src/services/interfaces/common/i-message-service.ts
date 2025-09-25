import { MessageDTO } from "@/dtos/message-dtos";
import { IPagination } from "@/interfaces";

export interface IMessageService {
    createMessage( data: Partial<MessageDTO>): Promise<void>;
    getMessages(
      candidateId: string,
      conversationId: string,
      pagination: IPagination
    ): Promise<{ data: MessageDTO[], total: number}>
}