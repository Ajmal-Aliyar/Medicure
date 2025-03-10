import { InferSchemaType } from "mongoose";
import { MessageSchema } from "./messageModel";

export type IMessage = InferSchemaType<typeof MessageSchema>