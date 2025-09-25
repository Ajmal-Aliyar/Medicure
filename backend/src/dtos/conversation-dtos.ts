import { Types } from "mongoose";

export interface ConversationDTO {
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