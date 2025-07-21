import { IConversation } from "@/models";
import { Types } from "mongoose";

export interface IConversationService {
    createConversation(
    initiatorId: Types.ObjectId,
    participantId: Types.ObjectId,
    isGroup: boolean,
    groupName?: string,
    groupImageUrl?: string
  ): Promise<IConversation>
}