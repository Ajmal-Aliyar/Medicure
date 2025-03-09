import mongoose from "mongoose";
import { IChat } from "./chatInterface";
import { ChatSchema } from "./chatShema";

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
