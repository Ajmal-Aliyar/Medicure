import { Request, Response } from "express";
import { producer } from "../utils/kafkaUtil";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";

export class MessageController {
    private messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;

        this.createMessage = this.createMessage.bind(this)
        this.getMessagesByChatId = this.getMessagesByChatId.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
        this.deleteMessage = this.deleteMessage.bind(this)
        this.markMessageAsSeen = this.markMessageAsSeen.bind(this)
    }

    async createMessage(req: Request, res: Response): Promise<void> {
        try {
            await producer.send({ topic: "chat-messages", messages: [{ value: JSON.stringify(req.body) }] });
            res.send("Message sent!");
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Failed to create message" });
        }
    }

    async getMessagesByChatId(req: Request, res: Response): Promise<void> {
        try {
            const { chatId } = req.params;
            const messages = await this.messageRepository.getMessagesByChatId(chatId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve messages" });
        }
    }

    async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const updatedMessage = await this.messageRepository.updateMessage(messageId, req.body);
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ error: "Failed to update message" });
        }
    }

    async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const deleted = await this.messageRepository.deleteMessage(messageId);
            if (!deleted) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete message" });
        }
    }

    async markMessageAsSeen(req: Request, res: Response): Promise<void> {
        try {
            const { messageId } = req.params;
            const { userId } = req.body;
            const updatedMessage = await this.messageRepository.markMessageAsSeen(messageId, userId);
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ error: "Failed to mark message as seen" });
        }
    }
}


