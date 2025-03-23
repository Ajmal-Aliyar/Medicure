import mongoose, { InferSchemaType } from "mongoose";
import { MessageSchema } from "./messageModel";

export type IMessage = InferSchemaType<typeof MessageSchema> & { _id: mongoose.Types.ObjectId };