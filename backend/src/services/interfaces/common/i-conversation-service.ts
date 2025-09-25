import { ConversationDTO } from "@/dtos";
import { IPagination, IRole } from "@/interfaces";

export interface IConversationService {
    createConversation(
    participants: { id: string, role: IRole }[],
    isGroup: boolean,
    groupName?: string,
    groupImageUrl?: string
  ): Promise<ConversationDTO>;
  getConversactions(id: string, pagination: IPagination): Promise<{ data: ConversationDTO[], total: number }>;
  updateLastMessage( id: string, message: string, date: Date ): Promise<void>;
  isMember( candidateId: string, conversationId: string): Promise<boolean>;
}