import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { IChatServices } from "../services/interfaces/IChatServices";

export class ChatController {
    private chatRepository: IChatServices;

    constructor(chatRepository: IChatServices) {
        this.chatRepository = chatRepository;

        this.createChat = this.createChat.bind(this)
        this.getChatById = this.getChatById.bind(this)
        this.getUserChats = this.getUserChats.bind(this)
        this.updateLastMessage = this.updateLastMessage.bind(this)
        this.deleteChat = this.deleteChat.bind(this)
        this.markAsRead = this.markAsRead.bind(this)
    }

    async createChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('hello');
            
            const { participants, isGroup, groupName, groupIcon } = req.body;
            console.log(req.body);
            
            if (!participants || participants.length < 2) {
                res.status(400).json({ message: "At least two participants are required." });
            }

            const newChat = await this.chatRepository.createChat({participants, isGroup, groupName, groupIcon});
            res.status(201).json(newChat);
        } catch (error) {
            next(error)
        }
    }

    async getChatById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const chatId = new mongoose.Types.ObjectId(req.params.chatId);
            const chat = await this.chatRepository.getChatById({chatId});
            
            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
            }

            res.status(200).json(chat);
        } catch (error) {
            next(error)
        }
    }

    async getUserChats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId);
            const { role } = req.client
            const chats = await this.chatRepository.getUserChats({userId, role});
            res.status(200).json({data: chats});
        } catch (error) {
            next(error)
        }
    }

    async updateLastMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { chatId, messageId } = req.body;
            const updatedChat = await this.chatRepository.updateLastMessage({ chatId, messageId });
            
            if (!updatedChat) {
                throw new Error('Chat not updated')
            }

            res.status(200).json(updatedChat);
        } catch (error) {
            next(error)
        }
    }

    async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { chatId } = req.params
            const { _id } = req.client
            
            await this.chatRepository.markAsRead( chatId, _id )
            res.status(200).json({ message: "Chat mark as read." });
        } catch (error) {
            next(error)
        }
    }

    async deleteChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const chatId = new mongoose.Types.ObjectId(req.params.chatId);
            await this.chatRepository.deleteChat({chatId});
            res.status(200).json({ message: "Chat deleted successfully" });
        } catch (error) {
            next(error)
        }
    }
}
