import type { MetaType } from "./common";

export interface IConversationService {
  getConversations(
    page: number
  ): Promise<{ data: IConversationDetails[]; meta: MetaType }>;
}

export interface IConversationDetails {
  _id: string;
  isGroup: boolean;
  members: IParticipant[];
  groupImageUrl: string | null;
  name?: string;
  createdAt: Date;
  lastMessage: {
    message: string;
    date?: Date;
  } 
}

export interface IParticipant {
  id: string;
  fullName: string;
  profileImage: string | null;
}
