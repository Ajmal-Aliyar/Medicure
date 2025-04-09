import mongoose, { ObjectId } from "mongoose";
import { IChat } from "../../models/chat/chatInterface";

export interface IChatServices {
  createChat({
    participants,
    isGroup,
    groupName,
    groupIcon,
  }: ICreateChat): Promise<IChat>;
  getChatById({ chatId }: IChatId): Promise<IChat>;
  getUserChats({
    userId,
    role,
  }: IGetUserChats): Promise<
    (
      | {
          unreadMessages: { [k: string]: number };
          participants: ObjectId[];
          isGroup: boolean;
          groupName: string;
          groupIcon: string;
          createdAt: NativeDate;
          lastMessage: ObjectId;
          _id: ObjectId;
        }
      | {}
    )[]
  >;
  updateLastMessage({ chatId, messageId }: IUpdateLastMessage): Promise<IChat>;
  deleteChat({ chatId }: IChatId): Promise<void>;
  handleUnreadMessage(chatId: string, senderId: string): Promise<void>;
  markAsRead(chatId: string, userId: string): Promise<void>;
}

export interface ICreateChat {
  participants: mongoose.Types.ObjectId[];
  isGroup?: boolean;
  groupName?: string | null;
  groupIcon?: string | null;
}

export interface IChatId {
  chatId: mongoose.Types.ObjectId;
}

export interface IGetUserChats {
  userId: mongoose.Types.ObjectId;
  role: string;
}

export interface IUpdateLastMessage {
  chatId: mongoose.Types.ObjectId;
  messageId: mongoose.Types.ObjectId;
}

export interface IChatListResponse {
  participants: {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    profileImage: string;
  }[];
  isGroup: boolean;
  groupName: string;
  groupIcon: string;
  createdAt: Date;
  lastMessage: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}
