"use client";

import { ReactNode } from "react";
import { Dialog } from "./ui/dialog";
import { cn } from "@/src/lib/utils";
import { Button } from "./ui/button";
import { type LucideIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: LucideIcon;
  buttonIcon?: LucideIcon;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image: ImageIcon,
  buttonIcon: ButtonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Centering wrapper */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full max-w-[540px]"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()} // prevents click bubbling
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-3xl",
                    "border border-border/50 bg-background/70 backdrop-blur-xl shadow-card"
                  )}
                >
                  {/* subtle gradients */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.14),transparent_45%)]" />

                  {/* header */}
                  <div className="relative px-7 pt-7 pb-4 border-b border-border/40">
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close"
                      className={cn(
                        "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl",
                        "border border-border/40 bg-background/60 hover:bg-background/80 transition-colors"
                      )}
                    >
                      <X className="h-4 w-4 text-foreground" />
                    </button>

                    <div className="flex items-start gap-4">
                      {ImageIcon && (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.05, duration: 0.22 }}
                          className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-primary shadow-soft flex items-center justify-center"
                        >
                          <ImageIcon className="h-6 w-6 text-primary-foreground" />
                        </motion.div>
                      )}

                      <div className="min-w-0">
                        <h1
                          className={cn(
                            "text-xl md:text-2xl font-bold text-foreground leading-tight",
                            className
                          )}
                        >
                          {title}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Complete the details below to continue.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* body */}
                  <div className="relative px-7 py-6">
                    <div className="flex flex-col gap-5">{children}</div>

                    <div className="mt-7">
                      <Button
                        onClick={handleClick}
                        className={cn(
                          "w-full h-12 text-base font-semibold",
                          "bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft"
                        )}
                      >
                        {ButtonIcon && (
                          <ButtonIcon
                            size={18}
                            strokeWidth={1.8}
                            className="mr-2"
                          />
                        )}
                        {buttonText || "Continue"}
                      </Button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default MeetingModal;
