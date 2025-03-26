import mongoose, { InferSchemaType } from "mongoose";
import { ChatSchema } from "./chatShema";

export type IChat = InferSchemaType<typeof ChatSchema>  & { _id: mongoose.Types.ObjectId };

