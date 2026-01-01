import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import { broadcast } from "../websocket/ws";

type SaveMessageInput = {
  conversationId?: string;
  senderType: string;
  content: string;
};

export async function saveMessage({
  conversationId,
  senderType,
  content,
}: SaveMessageInput) {
  let conversation = conversationId
    ? await Conversation.findById(conversationId)
    : null;

  if (!conversation) {
    conversation = await Conversation.create({});
  }

  const message = await Message.create({
    conversationId: conversation._id,
    senderType,
    content,
  });

  // realtime push to operators
  broadcast(JSON.stringify(message));

  return message;
}
