"use client";

import { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";
import { useTodoStore } from "@/lib/state/store";

export default function TodosPageClient({ initialTodos }: { initialTodos: Todo[] }) {
  const hydrate = useTodoStore((state) => state.hydrate);
  const hasHydrated = useTodoStore((state) => state.hasHydrated);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    // Avoid re-hydrating the client store after initial load.
    if (hasHydrated) return;

    // Seed the store from SSR data, then fall back to API if empty.
    hydrate(initialTodos);

    if (initialTodos.length === 0) {
      fetchTodos();
    }
  }, [fetchTodos, hasHydrated, hydrate, initialTodos]);

  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}
