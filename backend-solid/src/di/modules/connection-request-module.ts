import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { ConnectionRequestRepository, IConnectionRequestRepository } from "@/repositories";
import {
    ConnectionRequestService,
  IConnectionRequestService,
} from "@/services";
import {
  ConnectionRequestController,
  IConnectionRequestController,
} from "@/controllers";

export const bindConnectionRequestModule = async (container: Container) => {
  container
    .bind<IConnectionRequestRepository>(TYPES.ConnectionRequestRepository)
    .to(ConnectionRequestRepository);
  container.bind<IConnectionRequestService>(TYPES.ConnectionRequestService).to(ConnectionRequestService);
  container
    .bind<IConnectionRequestController>(TYPES.ConnectionRequestController)
    .to(ConnectionRequestController);
};
