"use client";

import { notify } from "@/lib/toast";
import { useState } from "react";
import type React from "react";
import AddButton from "@/components/AddButton";
import { useTodoStore } from "@/lib/state/store";

export default function TodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form data
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      notify.error("Title is required");
      return;
    }

    setIsLoading(true);
    notify.loading("Adding todo...");
    try {
      await addTodo(trimmedTitle);
      setTitle("");
      notify.success("Todo added");
    } catch {
      notify.error("Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-2 mb-4" onSubmit={formSubmitHandler}>
      <input
        name="title"
        placeholder="Add a new task"
        className="flex-1 border rounded-md px-3 py-2"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
      />
      <AddButton isLoading={isLoading} />
    </form>
  );
}
