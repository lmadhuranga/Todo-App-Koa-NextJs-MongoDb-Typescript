"use client";

import toast from "react-hot-toast";
import { useEffect } from "react";

export default function TodoError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>⚠️ Something went wrong</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
