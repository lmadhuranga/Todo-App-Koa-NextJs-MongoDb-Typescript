"use client";

import { useShallow } from "zustand/shallow";
import TodoItem from "./TodoItem";
import { useTodoStore } from "@/lib/stores/todoStore";

export default function TodoList() {
  const { todos, isFetching, error, fetchTodos } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      isFetching: state.isFetching,
      error: state.error,
      fetchTodos: state.fetchTodos
    }))
  );

  if (error && todos.length === 0) {
    return (
      <div className="text-center space-y-2">
        <p className="text-sm text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => fetchTodos()}
          className="text-sm text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

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
