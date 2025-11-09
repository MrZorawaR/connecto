import * as React from "react";
import { cn } from "@/src/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full h-10 rounded-[var(--radius-sm)] border border-[var(--clr-border)]",
          "bg-[var(--clr-surface)] text-[var(--clr-text)] placeholder-[var(--clr-muted)]",
          "px-3 py-2 text-sm shadow-sm transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "file:border-0 file:bg-transparent file:text-[var(--clr-text)]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
