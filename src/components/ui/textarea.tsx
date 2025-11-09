import * as React from "react";
import { cn } from "@/src/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[100px] resize-y rounded-[var(--radius-sm)] border border-[var(--clr-border)]",
        "bg-[var(--clr-surface)] text-[var(--clr-text)] placeholder-[var(--clr-muted)]",
        "px-3 py-2 text-sm shadow-sm transition-all leading-relaxed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clr-primary)] focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
