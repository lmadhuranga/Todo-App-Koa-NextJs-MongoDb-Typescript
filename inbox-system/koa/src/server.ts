import "dotenv/config";
import http from "http";
import app from "./app";
import { connectDB } from "./db";
import { initWebSocket } from "./websocket/ws";

async function start() {
  await connectDB();

  const server = http.createServer(app.callback());
  initWebSocket(server);

  server.listen(4000, () =>
    console.log("Koa API running on port 4000")
  );
}

start();
