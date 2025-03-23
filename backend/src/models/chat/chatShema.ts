import mongoose, { Schema } from "mongoose";

export const ChatSchema = new Schema({
    isGroup: { type: Boolean, required: true },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    groupName: { type: String, default: null },
    groupIcon: { type: String, default: null },
    unreadMessages: {
        type: Map,
        of: Number,
        default: {},
      },
    createdAt: { type: Date, default: Date.now },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
});

