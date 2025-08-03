import { IMessage } from "@/models";
import { IBaseRepository } from "./i-base-repository";

export interface IMessageRepository extends IBaseRepository<IMessage> {}