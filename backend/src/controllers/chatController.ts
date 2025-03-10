import { Request, Response } from "express";
import mongoose from "mongoose";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";

export class ChatController {
    private chatRepository: IChatRepository;

    constructor(chatRepository: IChatRepository) {
        this.chatRepository = chatRepository;

        this.createChat = this.createChat.bind(this)
        this.getChatById = this.getChatById.bind(this)
        this.getUserChats = this.getUserChats.bind(this)
        this.updateLastMessage = this.updateLastMessage.bind(this)
        this.deleteChat = this.deleteChat.bind(this)
    }

    async createChat(req: Request, res: Response): Promise<void> {
        try {
            const { participants, isGroup, groupName, groupIcon } = req.body;
            if (!participants || participants.length < 2) {
                res.status(400).json({ message: "At least two participants are required." });
            }

            const newChat = await this.chatRepository.createChat(participants, isGroup, groupName, groupIcon);
            res.status(201).json(newChat);
        } catch (error) {
            res.status(500).json({ message: "Error creating chat", error });
        }
    }

    async getChatById(req: Request, res: Response): Promise<void> {
        try {
            const chatId = new mongoose.Types.ObjectId(req.params.chatId);
            const chat = await this.chatRepository.getChatById(chatId);
            
            if (!chat) {
                res.status(404).json({ message: "Chat not found" });
            }

            res.status(200).json(chat);
        } catch (error) {
            res.status(500).json({ message: "Error fetching chat", error });
        }
    }

    async getUserChats(req: Request, res: Response): Promise<void> {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId);
            const { role } = req.client
            const chats = await this.chatRepository.getUserChats(userId, role);
            res.status(200).json({data: chats});
        } catch (error) {
            res.status(500).json({ message: "Error fetching user chats", error });
        }
    }

    async updateLastMessage(req: Request, res: Response): Promise<void> {
        try {
            const { chatId, messageId } = req.body;
            const updatedChat = await this.chatRepository.updateLastMessage(new mongoose.Types.ObjectId(chatId), new mongoose.Types.ObjectId(messageId));
            
            if (!updatedChat) {
                res.status(404).json({ message: "Chat not found" });
            }

            res.status(200).json(updatedChat);
        } catch (error) {
            res.status(500).json({ message: "Error updating last message", error });
        }
    }

    async deleteChat(req: Request, res: Response): Promise<void> {
        try {
            const chatId = new mongoose.Types.ObjectId(req.params.chatId);
            await this.chatRepository.deleteChat(chatId);
            res.status(200).json({ message: "Chat deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting chat", error });
        }
    }
}
