import { IPagination } from "@/interfaces";
import { IMessage } from "@/models";

export interface IMessageService {
    createMessage( data: Partial<IMessage>): Promise<void>;
    getMessages(
      candidateId: string,
      conversationId: string,
      pagination: IPagination
    ): Promise<{ data: IMessage[], total: number}>
}