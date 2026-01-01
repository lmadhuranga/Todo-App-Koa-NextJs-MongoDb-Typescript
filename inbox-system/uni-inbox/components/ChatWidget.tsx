// components/ChatWidget.tsx
"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [message, setMessage] = useState("");
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const send = async () => {
    await fetch(`${apiBaseUrl}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderType: "customer",
        content: message,
      }),
    });
    setMessage("");
  };

  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
