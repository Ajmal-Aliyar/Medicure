import { IMessage} from "@/models";
import { BaseRepository } from "../base";
import { Message } from "@/models";
import { IMessageRepository } from "../interfaces";


export class MessageRepository
  extends BaseRepository<IMessage>
  implements IMessageRepository
{
  constructor() {
    super(Message);
  }
}
