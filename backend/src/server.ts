import app from "./app";
import { connectDb } from "./config/database";
import { env } from "./config/env";

const init = () => {
  connectDb().then(() => {
    app.listen(env.port, () => {
      console.log(`Start server ${env.port}`);
    })
  })
}

init();