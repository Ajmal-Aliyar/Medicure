import { Router } from "express";
import { ChatRepository } from "../repositories/implementations/chatRepository";
import { ChatController } from "../controllers/chatController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

const router = Router();

const chatRepository = new ChatRepository();
const chatController = new ChatController(chatRepository);

router.post("/", tokenMiddleware, chatController.createChat);
router.get("/:chatId", tokenMiddleware, chatController.getChatById);
router.get("/user/:userId", tokenMiddleware, chatController.getUserChats);
router.put("/update-last-message", tokenMiddleware, chatController.updateLastMessage);
router.delete("/:chatId", tokenMiddleware, chatController.deleteChat);

export default router;
