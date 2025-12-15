"use client";

import { useToast } from "@/src/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/src/components/ui/toast";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";

function getIcon(variant?: string) {
  if (variant === "destructive") return XCircle;
  if (variant === "warning") return AlertTriangle;
  if (variant === "success") return CheckCircle2;
  return Info;
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, title, description, action, ...props }) => {
          const Icon = getIcon((props as any)?.variant);

          return (
            <Toast key={id} {...props} className="p-0 border-none bg-transparent shadow-none">
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className="group relative overflow-hidden rounded-2xl glass shadow-card border border-border/50"
              >
                {/* glow blobs */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-primary opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-accent opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-125" />

                {/* progress bar (pure CSS, feels interactive) */}
                <div className="absolute left-0 top-0 h-[3px] w-full bg-border/40">
                  <motion.div
                    className="h-full bg-gradient-primary"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4.5, ease: "linear" }} // match your toast remove delay if you want
                  />
                </div>

                <div className="relative flex gap-3 p-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    {title && (
                      <ToastTitle className="text-foreground font-semibold">
                        {title}
                      </ToastTitle>
                    )}
                    {description && (
                      <ToastDescription className="mt-1 text-muted-foreground">
                        {description}
                      </ToastDescription>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    {action}
                    <ToastClose className="rounded-xl border border-border/50 bg-background/40 hover:bg-background/70 text-muted-foreground hover:text-foreground transition-colors" />
                  </div>
                </div>
              </motion.div>
            </Toast>
          );
        })}
      </AnimatePresence>

      <ToastViewport className="fixed top-4 right-0 z-[200] flex max-h-screen w-[380px] flex-col gap-3 p-0 outline-none max-sm:left-0 max-sm:right-0 max-sm:w-auto" />
    </ToastProvider>
  );
}
