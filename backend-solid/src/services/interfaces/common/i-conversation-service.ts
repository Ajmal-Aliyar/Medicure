import { IPagination, IRole } from "@/interfaces";
import { IConversation } from "@/models";
import { Types } from "mongoose";

export interface IConversationService {
    createConversation(
    participants: { id: string, role: IRole }[],
    isGroup: boolean,
    groupName?: string,
    groupImageUrl?: string
  ): Promise<IConversation>;
  getConversactions(id: string, pagination: IPagination): Promise<{ data: IConversation[], total: number }>;
  updateLastMessage( id: string, message: string, date: Date ): Promise<void>
}