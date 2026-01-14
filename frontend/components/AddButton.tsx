import React from "react";

type AddButtonProps = {
  isLoading?: boolean;
  label?: string;
  className?: string;
};

export default function AddButton({ isLoading = false, label = "Add", className = "" }: AddButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition ${isLoading
          ? "bg-[rgb(var(--sky))]/40"
          : "bg-[rgb(var(--accent))] hover:bg-[rgb(var(--accent-strong))]"
        } disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}
