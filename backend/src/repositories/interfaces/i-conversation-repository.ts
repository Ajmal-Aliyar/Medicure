import { IConversation } from "@/models";
import { FindAllOptions, IBaseRepository } from "./i-base-repository";

export interface IConversationRepository extends IBaseRepository<IConversation> {
    getConversactionsOfUser(options: FindAllOptions<IConversation>): Promise<{ data: any[]; total: number }>
}