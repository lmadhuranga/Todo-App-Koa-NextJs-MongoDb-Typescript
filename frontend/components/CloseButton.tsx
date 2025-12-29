import React from "react";

type CloseButtonProps = {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "text-red-500 hover:text-red-700 transition",
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

export default CloseButton;
