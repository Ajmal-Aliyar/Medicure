import type { MetaType } from "./common";

export interface IMessage {
  conversationId: string;
  senderId: string;
  content: string;
  messageType?: "text" | "image" | "file" | "video" | "audio";
  mediaUrl?: string;
  seenBy?: string[];     
  createdAt: string;
  updatedAt?: string;
}


export interface IMessageService {
    getMessages( conversationId: string, page: number): Promise<{ data: IMessage[], meta: MetaType}>
}