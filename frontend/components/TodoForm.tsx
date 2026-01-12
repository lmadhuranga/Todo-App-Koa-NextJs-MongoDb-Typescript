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
    <form className="flex flex-col sm:flex-row gap-3 mb-5" onSubmit={formSubmitHandler}>
      <input
        name="title"
        placeholder="Add a new task"
        className="flex-1 rounded-full border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--sky))]/40"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
      />
      <div className="self-start sm:self-auto">
        <AddButton isLoading={isLoading} />
      </div>
    </form>
  );
}
