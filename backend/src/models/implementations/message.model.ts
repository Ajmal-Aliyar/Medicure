import { Schema, model } from 'mongoose';
import { IMessage } from '../interfaces';


const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "video", "audio"],
      required: true,
      default: "text",
    },
    mediaUrl: {
      type: String,
    },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
      }
    ],
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>('Message', MessageSchema);
