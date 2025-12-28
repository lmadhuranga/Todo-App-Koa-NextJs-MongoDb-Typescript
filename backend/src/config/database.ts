import mongoose from "mongoose";
import { env } from "./env";

export async function connectDb() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.mongoUrl);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}
