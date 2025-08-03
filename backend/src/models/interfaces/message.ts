import { Document, Types } from "mongoose";

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "file" | "video" | "audio";
  mediaUrl?: string;
  seenBy: Types.ObjectId[];     
  createdAt: Date;
  updatedAt: Date;
}
