"use client";

import toast from "react-hot-toast";
import { createTodo } from "@/lib/actions";

export default function TodoForm() {
  return (
    <form
      action={async (formData) => {
        const title = formData.get("title") as string;

        if (!title) {
          toast.error("Title is required");
          return;
        }

        toast.loading("Adding todo...");

        try {
          await createTodo(title);
          toast.dismiss();
          toast.success("Todo added");
        } catch {
          toast.dismiss();
          toast.error("Failed to add todo");
        }
      }}
    >
      <input name="title" placeholder="New todo" />
      <button type="submit">Add</button>
    </form>
  );
}
