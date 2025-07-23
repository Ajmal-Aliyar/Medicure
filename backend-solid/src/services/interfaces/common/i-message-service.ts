import { IMessage } from "@/models";

export interface IMessageService {
    createMessage( data: Partial<IMessage>): Promise<void>;
}