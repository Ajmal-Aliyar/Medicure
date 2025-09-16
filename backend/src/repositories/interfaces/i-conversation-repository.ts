import { IConversation } from "@/models";
import { FindAllOptions, IBaseRepository } from "./i-base-repository";
import { Types } from "mongoose";

export interface IConversationRepository extends IBaseRepository<IConversation> {
    getConversactionsOfUser(options: FindAllOptions<IConversation>): Promise<{ data: any[]; total: number }>;
    isConnected(user1: Types.ObjectId, user2: Types.ObjectId): Promise<boolean>;
}