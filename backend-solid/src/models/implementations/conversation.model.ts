import mongoose, { Schema } from 'mongoose';
import { IConversation } from '../interfaces';


const ConversationSchema: Schema<IConversation> = new Schema(
  {
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ],
    name: {
      type: String,
      required: function (this: IConversation) {
        return this.isGroup;
      },
      trim: true,
    },
    groupImageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
