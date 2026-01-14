"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import { notify } from "@/lib/toast";
import ConfirmDialog from "@/components/ConfirmDialog";
import DeleteButton from "./DeleteButton";
import { useTodoStore } from "@/lib/state/store";

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const isMutating = useTodoStore((state) => state.isMutating);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (isMutating) return;
    notify.loading("Updating...");
    try {
      await toggleTodo(todo.id, !todo.completed);

      notify.success("Updated");
    } catch {
      notify.error("Update failed");
    }
  }

  const handleDelete = async () => {
    if (isMutating) return;
    setLoading(true);
    setShowConfirm(false); 
    try {
      await deleteTodo(todo.id);
      notify.success("Todo deleted");
    } catch {
      notify.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  const titleClassName = `text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`;

  const handleOpenConfirm = () => {
    if (isMutating || loading) return;
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setLoading(false);
  };

  return (
    <>
      {/* Todo Row */}
      <li className="group flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-3 py-2.5 shadow-sm transition hover:border-slate-200 hover:shadow-md">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={isMutating}
            className="h-4 w-4 text-[rgb(var(--sky))] disabled:opacity-50"
          />
          <span className={titleClassName}>
            {todo.title}
          </span>
        </div>

        <DeleteButton
          onClick={handleOpenConfirm}
          disabled={isMutating || loading}
          ariaLabel="Delete todo"
        />
      </li>

      <ConfirmDialog
        open={showConfirm}
        loading={loading}
        onConfirm={handleDelete}
        onClose={handleCloseConfirm}
      />
    </>
  );
}
