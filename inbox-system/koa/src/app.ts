import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import cors from "@koa/cors";
import messageRoutes from "./routes/messages";

const app = new Koa();
const router = new Router();

router.use("/messages", messageRoutes.routes());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(bodyParser());
app.use(router.routes());

export default app;
