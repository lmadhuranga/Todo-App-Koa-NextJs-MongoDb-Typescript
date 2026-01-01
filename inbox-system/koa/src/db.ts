import mongoose from "mongoose";

export async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set");
  }
  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected");
}
