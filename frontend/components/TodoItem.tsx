"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateTodo, deleteTodo } from "@/lib/actions";
import { Todo } from "@/types/todo";
import { notify } from "@/lib/toast";
import ConfirmDialog from "@/components/ConfirmDialog";
import CloseButton from "./CloseButton";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    toast.loading("Updating...");
    try {
      await updateTodo(todo.id, { completed: !todo.completed });

      notify.success("Updated");
    } catch {
      notify.error("Update failed");
    }
  }

  async function handleDelete() {
    setLoading(true);
    setShowConfirm(false);
    toast.loading("Deleting...");
    try {
      await deleteTodo(todo.id);
      notify.success("Todo deleted");
    } catch {
      notify.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Todo Row */}
      <li className="flex items-center justify-between border rounded-md px-3 py-2 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="h-4 w-4 text-blue-600"
          />
          <span className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`} >
            {todo.title}
          </span>
        </div>

        <CloseButton onClick={() => setShowConfirm(true)} ariaLabel="Delete todo" />
      </li>

      <ConfirmDialog
        open={showConfirm}
        loading={loading}
        onConfirm={handleDelete}
        onClose={() => {
          setShowConfirm(false);
          setLoading(false);
        }}
      />
    </>
  );
}
