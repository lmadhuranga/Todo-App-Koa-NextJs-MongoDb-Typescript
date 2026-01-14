import React from "react";

type DeleteButtonProps = {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  className = "inline-flex items-center justify-center h-8 w-8 rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition",
  ariaLabel = "Close",
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      ✕
    </button>
  );
};

export default DeleteButton;
