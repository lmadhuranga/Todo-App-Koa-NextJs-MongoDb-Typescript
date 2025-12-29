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
    if (hasHydrated) {
      return;
    }

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
