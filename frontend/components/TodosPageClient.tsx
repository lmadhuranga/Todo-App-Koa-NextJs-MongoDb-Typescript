"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";
import { useTodoStore } from "@/lib/stores/todoStore";

export default function TodosPageClient({ initialTodos }: { initialTodos: Todo[] }) {
  const { hydrate, hasHydrated, fetchTodos } = useTodoStore(
    useShallow((state) => ({
      hydrate: state.hydrate,
      hasHydrated: state.hasHydrated,
      fetchTodos: state.fetchTodos
    }))
  );

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
