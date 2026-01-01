import mongoose, { Schema, Document } from "mongoose";

export interface ConversationDocument extends Document {}

const ConversationSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;
