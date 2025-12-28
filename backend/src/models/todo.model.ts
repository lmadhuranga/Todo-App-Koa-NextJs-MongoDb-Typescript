import mongoose, { Schema, Document, ObjectId, Types } from "mongoose";
import { ITodo } from "../types/todo.types";

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

TodoSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
