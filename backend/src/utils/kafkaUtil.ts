import { Kafka } from "kafkajs";
import { getSocketInstance } from "./socket";
import { MessageRepository } from "../repositories/implementations/messageRepository";
import { ChatRepository } from "../repositories/implementations/chatRepository";
import mongoose from "mongoose";

const kafka = new Kafka({ clientId: "chat-app", brokers: ["localhost:9092"] });
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chat-group" });
const messageRepository = new MessageRepository()
const chatRepository = new ChatRepository()

export const initKafka = async () => {
  try {
    await producer.connect();
  } catch (error) {
    console.error("Kafka Producer connection failed:", error);
  }
};
initKafka()

export const runConsumer = async (attempt = 1) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "chat-messages", fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ message }:any) => {        
        const io = getSocketInstance()
        const msg = JSON.parse(message.value.toString());
        io.to(msg.chatId).emit("newMessage", msg);
        const mess = await messageRepository.createMessage(msg)
        chatRepository.updateLastMessage(new mongoose.Types.ObjectId(mess.chatId),
       new mongoose.Types.ObjectId(mess._id)
     )
      },
    });

  } catch (error) {
    console.error("Kafka consumer connection failed:", error);
    if (attempt <= 5) {
      await consumer.disconnect(); 
      setTimeout(() => runConsumer(attempt + 1), attempt * 2000);
    } else {
      console.error("Kafka consumer failed after multiple attempts.");
    }
  }
};
runConsumer();

    