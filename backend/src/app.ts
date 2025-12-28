import Koa from "koa";
import bodyParser from "koa-bodyparser";
import errorMiddleware from "./middlewares/error.middleware";
import todoRouter from "./routes/todo.routes";
import cors from "@koa/cors";
import { delayMiddleware } from "./middlewares/delay.middleware";
 
const app = new Koa();
app.use(cors());

app.use(errorMiddleware);

// add body parse
app.use(bodyParser());

app.use(delayMiddleware(2000));

// Add router 
app.use(todoRouter.routes());

export default app;
