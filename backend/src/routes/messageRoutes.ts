import { Router } from "express";
import { MessageRepository } from "../repositories/implementations/messageRepository";
import { MessageController } from "../controllers/messageController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

const router = Router();

const messageRepository = new MessageRepository();
const messageController = new MessageController(messageRepository);

router.post("/messages", tokenMiddleware, messageController.createMessage);
router.get("/messages/:chatId", tokenMiddleware, messageController.getMessagesByChatId);
router.put("/messages/:messageId", tokenMiddleware, messageController.updateMessage);
router.delete("/messages/:messageId", tokenMiddleware, messageController.deleteMessage);
router.patch("/messages/:messageId/seen", tokenMiddleware, messageController.markMessageAsSeen);

export default router;
