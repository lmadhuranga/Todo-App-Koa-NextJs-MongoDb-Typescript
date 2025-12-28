import React from "react";

type CloseButtonProps = {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "text-red-500 hover:text-red-700 transition",
  ariaLabel = "Close",
}) => {
  return (
    <button type="button" onClick={onClick} className={className} aria-label={ariaLabel}> ✕ </button>
  );
};

export default CloseButton;