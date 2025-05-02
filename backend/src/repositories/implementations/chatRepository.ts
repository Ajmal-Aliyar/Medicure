import mongoose from "mongoose";
import { IChatRepository, IIsChatExists } from "../interfaces/IChatRepository";
import { Chat } from "../../models/chat/chatModel";
import { IChat } from "../../models/chat/chatInterface";
import { PatientModel } from "../../models/patient/patientModel";
import { DoctorModel } from "../../models/doctor/doctorModel";

export class ChatRepository implements IChatRepository {
  async createChat(
    participants: mongoose.Types.ObjectId[],
    isGroup = false,
    groupName: string | null = null,
    groupIcon: string | null = null
  ): Promise<IChat> {
    const newChat = new Chat({ participants, isGroup, groupName, groupIcon });
    return await newChat.save();
  }

  async getChatById(chatId: mongoose.Types.ObjectId): Promise<IChat | null> {
    return await Chat.findById(chatId)
      .populate("participants")
      .populate("lastMessage");
  }

  async getChatByUserId(
    userId: mongoose.Types.ObjectId
  ): Promise<IChat[] | null> {
    const chats = await Chat.find({ participants: userId })
      .populate("lastMessage")
      .lean();

    if (!chats) return null;

    return chats.map((chat) => ({
      ...chat,
      unreadMessages: new Map(Object.entries(chat.unreadMessages || {})),
    }));
  }
  async isChatExists({ patientId, doctorId }: IIsChatExists): Promise<boolean> {
    try {
      return !!(await Chat.exists({
        isGroup: false,
        participants: { $all: [patientId, doctorId], $size: 2 },
      }));
    } catch (error) {
      console.error("Error checking chat existence:", error);
      return false;
    }
  }

  async getUserChats(
    userId: mongoose.Types.ObjectId,
    role: string
  ): Promise<{ participants: { fullName: string; profileImage: string }[] }[]> {
    try {
      const chats = await Chat.find({ participants: userId }).lean();
      const client = (
        role === "doctor" ? PatientModel : DoctorModel
      ) as typeof PatientModel;

      const populatedChats = await Promise.all(
        chats.map(async (chat) => {
          const populatedParticipants = await Promise.all(
            chat.participants.map(async (clientId) => {
              const user = await client
                .findById(clientId, { fullName: 1, profileImage: 1 })
                .lean();
              return user || null;
            })
          );

          return {
            ...chat,
            participants: populatedParticipants.filter(Boolean),
          };
        })
      );

      return populatedChats;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      return [];
    }
  }

  async getDoctorChats(
    userId: mongoose.Types.ObjectId
  ): Promise<{ participants: { fullName: string; profileImage: string }[] }[]> {
    try {
      const chats = await Chat.find({ participants: userId }).lean();

      const populatedChats = await Promise.all(
        chats.map(async (chat) => {
          const populatedParticipants = await Promise.all(
            chat.participants.map(async (docterId) => {
              const user = await DoctorModel.findById(docterId, {
                fullName: 1,
                profileImage: 1,
              }).lean();
              return user || null;
            })
          );

          return {
            ...chat,
            participants: populatedParticipants.filter(Boolean),
          };
        })
      );

      return populatedChats;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      return [];
    }
  }

  async updateLastMessage(
    chatId: mongoose.Types.ObjectId,
    messageId: mongoose.Types.ObjectId
  ): Promise<IChat | null> {
    return await Chat.findByIdAndUpdate(
      chatId,
      { lastMessage: messageId },
      { new: true }
    );
  }

  async deleteChat(chatId: mongoose.Types.ObjectId): Promise<void> {
    await Chat.findByIdAndDelete(chatId);
  }

  async incrementUnreadCount(
    chatId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId
  ): Promise<void> {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error("Chat not found");

    const recipientId = chat.participants.find((id) => !id.equals(senderId));
    if (!recipientId) throw new Error("Recipient not found");

    await Chat.updateOne(
      { _id: chatId },
      { $inc: { [`unreadMessages.${recipientId}`]: 1 } }
    );
  }

  async markMessagesAsRead(
    chatId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<void> {
    await Chat.updateOne(
      { _id: chatId },
      { $set: { [`unreadMessages.${userId}`]: 0 } }
    );
  }
}
