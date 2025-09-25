import { Types } from "mongoose";

export interface MessageDTO {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "file" | "video" | "audio";
  mediaUrl?: string;
  seenBy: Types.ObjectId[];     
  createdAt: Date;
  updatedAt: Date;
}