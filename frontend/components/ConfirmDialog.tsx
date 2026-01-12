import React, { useEffect } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Delete Todo?",
  message = "Are you sure you want to delete this todo? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // close when clicking backdrop (but not when clicking dialog)
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-white/70">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-2">{message}</p>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={() => {
              if (!loading) onClose();
            }}
            className="px-4 py-2 text-sm rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              if (!loading) onConfirm();
            }}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-full bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
