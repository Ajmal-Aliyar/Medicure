import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { ConversationRepository, IConversationRepository } from "@/repositories";
import {
    ConversationService,
  IConversationService,
} from "@/services";
import { ConversationController, IConversationController } from "@/controllers";


export const bindConversationModule = async (container: Container) => {
  container
    .bind<IConversationRepository>(TYPES.ConversationRepository)
    .to(ConversationRepository);
  container.bind<IConversationService>(TYPES.ConversationService).to(ConversationService);
  container
    .bind<IConversationController>(TYPES.ConversationController)
    .to(ConversationController);
};
