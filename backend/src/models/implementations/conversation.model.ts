import mongoose, { Schema, Types } from 'mongoose';
import { IConversation } from '../interfaces';

const MemberSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { _id: false } 
);

const ConversationSchema: Schema<IConversation> = new Schema(
  {
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    members: {
      type: [MemberSchema],
      validate: [(val: any[]) => val.length >= 2, 'At least 2 members required.'],
    },
    name: {
      type: String,
      required: function (this: IConversation) {
        return this.isGroup;
      },
      trim: true,
    },
    groupImageUrl: {
      type: String,
      default: null,
    },
    lastMessage: {
        message: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
        }
    }
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
