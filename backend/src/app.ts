import Koa from "koa";
import bodyParser from "koa-bodyparser";
import errorMiddleware from "./middlewares/error.middleware";
import todoRouter from "./routes/todo.routes";
 
const app = new Koa();

app.use(errorMiddleware);

// add body parse
app.use(bodyParser());

// Add router 
app.use(todoRouter.routes());

export default app;
