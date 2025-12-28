"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateTodo, deleteTodo } from "@/lib/actions";
import { Todo } from "@/types/todo";
import { notify } from "@/lib/toast";

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
    toast.loading("Deleting...");
    try {
      await deleteTodo(todo.id);
      notify.success("Todo deleted");
      setShowConfirm(false);
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
          <span
            className={`text-sm ${todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
              }`}
          >
            {todo.title}
          </span>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-500 hover:text-red-700 transition"
        >
          ✕
        </button>
      </li>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Delete Todo?
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this todo?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setLoading(false);
                }}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
