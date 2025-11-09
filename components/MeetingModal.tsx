"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { type LucideIcon } from "lucide-react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: LucideIcon;       // ✅ Updated
  buttonIcon?: LucideIcon;  // ✅ Updated
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
      <DialogContent
        className={cn(
          "flex w-full max-w-[520px] flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--clr-border)]",
          "bg-[var(--clr-surface)] px-8 py-10 text-[var(--clr-text)] shadow-[var(--elev-3)] backdrop-blur-md"
        )}
      >
        <div className="flex flex-col items-center gap-6">

          {/* ✅ Lucide Icon for Modal Header */}
          {ImageIcon && (
            <ImageIcon size={72} strokeWidth={1.8} className="text-[var(--clr-text)]" />
          )}

          <h1
            className={cn(
              "text-2xl font-bold leading-[34px] text-center text-[var(--clr-text)]",
              className
            )}
          >
            {title}
          </h1>

          {children}

          {/* ✅ Button with Lucide Icon */}
          <Button
            onClick={handleClick}
            className={cn(
              "button w-full justify-center text-base font-semibold",
              "hover:shadow-[var(--elev-1)] focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
          >
            {ButtonIcon && (
              <ButtonIcon size={18} strokeWidth={1.8} className="mr-2" />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;