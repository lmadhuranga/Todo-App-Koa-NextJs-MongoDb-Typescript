"use client";

import { notify } from "@/lib/toast";
import { createTodo } from "@/lib/actions";
import { useState } from "react";

export default function TodoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <form
      className="flex gap-2 mb-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
          notify.error("Title is required");
          return;
        }
        setIsLoading(true);
        notify.loading("Adding todo...");
        try {
          await createTodo(trimmedTitle);
          setTitle("");
          notify.success("Todo added");
        } catch {
          notify.error("Failed to add todo");
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input
        name="title"
        placeholder="Add a new task"
        className="flex-1 border rounded-md px-3 py-2"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        disabled={isLoading}
        className={`text-white px-4 py-2 rounded-md ${isLoading ? "bg-blue-200" : "bg-blue-600"} disabled:cursor-not-allowed`}
      >
        Add 
      </button>
    </form>
  );
}
