import WebSocket from "ws";
import type { Server } from "http";

let wss: WebSocket.Server;

export function initWebSocket(server: Server) {
  wss = new WebSocket.Server({ server });

  wss.on("connection", () => {
    console.log("Operator connected");
  });
}

export function broadcast(data: string) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
