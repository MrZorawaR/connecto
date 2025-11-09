"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
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
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="status" width={72} height={72} />
            </div>
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

          <Button
            onClick={handleClick}
            className={cn(
              "button w-full justify-center text-base font-semibold",
              "hover:shadow-[var(--elev-1)] focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={16}
                height={16}
              />
            )}
            {buttonIcon && <span className="ml-2" />}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;