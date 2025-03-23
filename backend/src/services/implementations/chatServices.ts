import { IChatRepository } from "../../repositories/interfaces/IChatRepository";
import { IChatId, IChatListResponse, IChatServices, ICreateChat, IGetUserChats, IUpdateLastMessage } from "../interfaces/IChatServices";
import { IChat } from "../../models/chat/chatInterface";
import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { IDoctorRepository } from "../../repositories/interfaces/IDoctorRepostory";
import mongoose from "mongoose";


export class ChatServices implements IChatServices {
    private chatRepository: IChatRepository;
    private patientRepository: IPatientRepository
    private doctorRepository: IDoctorRepository

    constructor(chatRepository: IChatRepository, patientRepository: IPatientRepository, doctorRepository: IDoctorRepository) {
        this.chatRepository = chatRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    async createChat({ participants, isGroup, groupName, groupIcon }: ICreateChat): Promise<IChat> {
        try {
            if (!participants || participants.length < 2) {
                throw new Error("At least two participants are required.")
            }
            return await this.chatRepository.createChat(participants, isGroup, groupName, groupIcon);
        } catch (error) {
            throw error
        }
    }

    async getChatById({ chatId }: IChatId): Promise<IChat> {
        try {
            const chat = await this.chatRepository.getChatById(chatId);
            if (!chat) {
                throw new Error("Chat not found")
            }
            return chat
        } catch (error) {
            throw error
        }
    }

    async getUserChats({ userId, role }: IGetUserChats): Promise<(any | IChat)[]> {
        try {
          const chats = await this.chatRepository.getChatByUserId(userId);
          console.log(chats, 'chats');
      
          const client = role === 'doctor' ? this.patientRepository : this.doctorRepository;
      
          const populatedChats = await Promise.all(
            chats.map(async (chat) => {
              // Convert Map to Object for easier access on frontend
              const unreadMessagesObject = Object.fromEntries(chat.unreadMessages || []);
      
              if (chat.isGroup) {
                return { ...chat, unreadMessages: unreadMessagesObject };
              } else {
                const populatedParticipants = await Promise.all(
                  chat.participants.map(async (_id) => {
                    const user = await client.getMinDetails(_id);
                    return user || null;
                  })
                );
      
                return {
                  ...chat,
                  participants: populatedParticipants.filter(Boolean),
                  unreadMessages: unreadMessagesObject,
                };
              }
            })
          );
      
          return populatedChats;
        } catch (error) {
          throw error;
        }
      }
      

    async updateLastMessage({ chatId, messageId }: IUpdateLastMessage): Promise<IChat> {
        try {
            const updatedChat = await this.chatRepository.updateLastMessage(chatId, messageId);

            if (!updatedChat) {
                throw new Error('Chat not found')
            }

            return updatedChat
        } catch (error) {
            throw error
        }
    }

    async deleteChat({ chatId }: IChatId): Promise<void> {
        try {
            await this.chatRepository.deleteChat(chatId);
        } catch (error) {
            throw error
        }
    }

    async handleUnreadMessage(chatId: string, senderId: string) {
        const chat = await this.chatRepository.getChatById(new mongoose.Types.ObjectId(chatId));
        if (!chat) throw new Error('Chat not found');

        const recipientId = chat.participants.find(id => id.toString() !== senderId);
        if (recipientId) {
            await this.chatRepository.incrementUnreadCount(new mongoose.Types.ObjectId(chatId), recipientId);
        }
    }

    async markAsRead(chatId: string, userId: string) {
        await this.chatRepository.markMessagesAsRead(new mongoose.Types.ObjectId(chatId), new mongoose.Types.ObjectId(userId));
    }


}