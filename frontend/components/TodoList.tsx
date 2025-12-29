"use client";

import TodoItem from "./TodoItem";
import { useTodoStore } from "@/lib/state/store";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const isFetching = useTodoStore((state) => state.isFetching);

  if (isFetching && todos.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center">
        Loading todos...
      </p>
    );
  }

  if (todos.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center">
        No todos yet
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
