"use client";

import toast from "react-hot-toast";
import { updateTodo, deleteTodo } from "@/lib/actions";
import { Todo } from "@/types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  async function handleToggle() {
    toast.loading("Updating...");
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
      toast.dismiss();
      toast.success("Todo updated");
    } catch {
      toast.dismiss();
      toast.error("Update failed");
    }
  }

  async function handleDelete() {
    toast.loading("Deleting...");
    try {
      await deleteTodo(todo.id);
      toast.dismiss();
      toast.success("Todo deleted");
    } catch {
      toast.dismiss();
      toast.error("Delete failed");
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.title}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}
