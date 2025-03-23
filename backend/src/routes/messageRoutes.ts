import { Router } from "express";
import { MessageRepository } from "../repositories/implementations/messageRepository";
import { MessageController } from "../controllers/messageController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { MessageServices } from "../services/implementations/messageServices";
import { ChatRepository } from "../repositories/implementations/chatRepository";

const router = Router();

const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();
const messageServices = new MessageServices( messageRepository, chatRepository)
const messageController = new MessageController(messageServices);

router.post("/messages", tokenMiddleware, messageController.createMessage);
router.get("/messages/:chatId", tokenMiddleware, messageController.getMessagesByChatId);
router.put("/messages/:messageId", tokenMiddleware, messageController.updateMessage);
router.delete("/messages/:messageId", tokenMiddleware, messageController.deleteMessage);
router.patch("/messages/:messageId/seen", tokenMiddleware, messageController.markMessageAsSeen);

export default router;
