import React from "react";

export default function ErrorMessage({ errMessage }) {
  return (
    <p className="text-xs text-muted-foreground text-center py-6">
      error: {errMessage}
    </p>
  );
}
