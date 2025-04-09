import { Router } from "express";
import { ChatRepository } from "../repositories/implementations/chatRepository";
import { ChatController } from "../controllers/chatController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { ChatServices } from "../services/implementations/chatServices";
import { PatientRepository } from "../repositories/implementations/patientRepository";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";

const router = Router();

const chatRepository = new ChatRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const chatServices = new ChatServices(
  chatRepository,
  patientRepository,
  doctorRepository
);
const chatController = new ChatController(chatServices);

router.post("/", tokenMiddleware, chatController.createChat);
router.get("/:chatId", tokenMiddleware, chatController.getChatById);
router.get("/user/:userId", tokenMiddleware, chatController.getUserChats);
router.put(
  "/update-last-message",
  tokenMiddleware,
  chatController.updateLastMessage
);
router.delete("/:chatId", tokenMiddleware, chatController.deleteChat);
router.get("/markAsRead/:chatId", tokenMiddleware, chatController.markAsRead);

export default router;
