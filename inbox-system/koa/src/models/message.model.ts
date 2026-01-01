import mongoose, { Schema, Document } from "mongoose";

export interface MessageDocument extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderType: string;
  content: string;
}

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderType: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", MessageSchema);

export default Message;
