import { Document, Types } from "mongoose";

export interface IConversation extends Document {
  isGroup: boolean;
  members: { fullName: string, profileImage: string | null, id: Types.ObjectId}[];
  name?: string;
  groupImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: {
    message: string;
    date?: Date;
  } 
}
