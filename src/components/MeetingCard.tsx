"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "@/src/hooks/use-toast";
import { Copy } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: LucideIcon;           
  isPreviousMeeting?: boolean;
  buttonIcon1?: LucideIcon;   
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon: Icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1: ButtonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="card xl:max-w-[568px] min-h-[258px] w-full flex flex-col justify-between rounded-[var(--radius-md)]">
      
      <article className="flex flex-col gap-4">
        <Icon size={28} strokeWidth={1.8} className="text-[var(--clr-text)]" />

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-[var(--clr-text)]">{title}</h2>
          <p className="text-sm text-[var(--clr-muted)]">{date}</p>
        </div>
      </article>

      <article className={cn("flex items-center justify-end gap-2")}>
        {!isPreviousMeeting && (
          <>
            {/* Start / Play Button */}
            <Button
              variant="default"
              className="px-5 text-[var(--clr-text)] bg-[var(--clr-subtle)] hover:bg-[var(--clr-border)]/50"
              onClick={handleClick}
            >
              {ButtonIcon1 && <ButtonIcon1 size={18} strokeWidth={1.8} className="mr-2" />}
              {buttonText ?? "Start"}
            </Button>

            {/* Copy Link Button */}
            <Button
              variant="outline"
              className="px-5 text-[var(--clr-text)] border-[var(--clr-border)] hover:bg-[var(--clr-subtle)]"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({ title: "Link Copied" });
              }}
            >
              <Copy size={18} strokeWidth={1.8} className="mr-2" />
              Copy Link
            </Button>
          </>
        )}
      </article>

    </section>
  );
};

export default MeetingCard;
