"use client";

import { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";
import { useTodoStore } from "@/lib/state/store";
import SearchTodo from "./SearchTodo";

export default function TodosPageClient({ initialTodos }: { initialTodos: Todo[] }) {
  const hydrate = useTodoStore((state) => state.hydrate);
  const hasHydrated = useTodoStore((state) => state.hasHydrated);

  useEffect(() => {
    // Seed the client store with server-fetched todos only once.
    if (!hasHydrated) {
      hydrate(initialTodos);
    }
  }, [hasHydrated, hydrate, initialTodos]);

  return (
    <>
      <TodoForm />
      <SearchTodo />
      <TodoList />
    </>
  );
}
