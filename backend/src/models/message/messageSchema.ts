import mongoose, { InferSchemaType, Schema } from "mongoose";
import { MessageSchema } from "./messageModel";
import { IMessage } from "./messageInterface";

export const Message = mongoose.model<IMessage>("Message", MessageSchema);