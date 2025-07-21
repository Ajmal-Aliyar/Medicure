import { Document, Types } from "mongoose";

export interface IConversation extends Document {
  isGroup: boolean;
  members: Types.ObjectId[];
  name?: string;
  groupImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
