// app/inbox/page.tsx
"use client";

import { useEffect, useState } from "react";
import ChatWidget from "../../components/ChatWidget";

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000";

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Unified Inbox</h1>
      <ChatWidget />
      {messages.map(m => (
        <p key={m._id}>
          <b>{m.senderType}:</b> {m.content}
        </p>
      ))}
    </div>
  );
}
