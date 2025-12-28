import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
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
