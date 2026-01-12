"use client";

import { useCallback, useMemo, useState } from "react";
import { Todo } from "@/types/todo";
import { notify } from "@/lib/toast";
import ConfirmDialog from "@/components/ConfirmDialog";
import CloseButton from "./CloseButton";
import { useTodoStore } from "@/lib/state/store";

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const isMutating = useTodoStore((state) => state.isMutating);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(async () => {
    if (isMutating) return;
    notify.loading("Updating...");
    try {
      await toggleTodo(todo.id, !todo.completed);

      notify.success("Updated");
    } catch {
      notify.error("Update failed");
    }
  }, [isMutating, todo.completed, todo.id, toggleTodo]);

  const handleDelete = useCallback(async () => {
    if (isMutating) return;
    setLoading(true);
    setShowConfirm(false);
    notify.loading("Deleting...");
    try {
      await deleteTodo(todo.id);
      notify.success("Todo deleted");
    } catch {
      notify.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }, [deleteTodo, isMutating, todo.id]);

  const titleClassName = useMemo(
    () => `text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`,
    [todo.completed],
  );

  const handleOpenConfirm = useCallback(() => {
    if (isMutating || loading) return;
    setShowConfirm(true);
  }, [isMutating, loading]);

  const handleCloseConfirm = useCallback(() => {
    setShowConfirm(false);
    setLoading(false);
  }, []);

  return (
    <>
      {/* Todo Row */}
      <li className="flex items-center justify-between border rounded-md px-3 py-2 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={isMutating}
            className="h-4 w-4 text-blue-600 disabled:opacity-50"
          />
          <span className={titleClassName}>
            {todo.title}
          </span>
        </div>

        <CloseButton
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
