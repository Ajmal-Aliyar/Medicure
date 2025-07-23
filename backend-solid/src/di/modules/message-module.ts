import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { MessageRepository, IMessageRepository } from "@/repositories";
import { IMessageService, MessageService } from "@/services";
// import {
//     MessageService,
//   IMessageService,
// } from "@/services";
// import { MessageController, IMessageController } from "@/controllers";


export const bindMessageModule = async (container: Container) => {
  container
    .bind<IMessageRepository>(TYPES.MessageRepository)
    .to(MessageRepository);
  container.bind<IMessageService>(TYPES.MessageService).to(MessageService);
//   container
//     .bind<IMessageController>(TYPES.MessageController)
//     .to(MessageController);
};
