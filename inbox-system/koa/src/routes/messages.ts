import Router from "koa-router";
import { saveMessage } from "../services/message.service";

const router = new Router();

router.post("/", async (ctx) => {
  const body = ctx.request.body as {
    conversationId?: string;
    senderType?: string;
    content?: string;
  };
  const { conversationId, senderType, content } = body;

  if (!senderType || !content) {
    ctx.status = 400;
    ctx.body = { error: "senderType and content are required." };
    return;
  }

  const message = await saveMessage({
    conversationId,
    senderType,
    content,
  });

  ctx.body = message;
});

router.get('/', (ctx)=>{
  ctx.body = {hello:"hello"}
})

export default router;
