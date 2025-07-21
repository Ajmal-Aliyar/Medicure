import { IConversation} from "@/models";
import { BaseRepository } from "../base";
import { Conversation } from "@/models";
import { IConversationRepository } from "../interfaces";


export class ConversationRepository
  extends BaseRepository<IConversation>
  implements IConversationRepository
{
  constructor() {
    super(Conversation);
  }

  
}
