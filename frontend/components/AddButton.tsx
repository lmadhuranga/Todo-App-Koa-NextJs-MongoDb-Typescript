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
      className={`text-white px-4 py-2 rounded-md ${isLoading ? "bg-blue-200" : "bg-blue-600"} disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}
