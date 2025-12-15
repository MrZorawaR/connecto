"use client";

import { Button } from "./ui/button";
import { useToast } from "@/src/hooks/use-toast";
import { Copy, type LucideIcon } from "lucide-react";

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
    <section
      className={[
        "group relative w-full min-h-[258px] overflow-hidden rounded-3xl",
        "glass shadow-card transition-all duration-300 hover:shadow-hover",
        "p-6 flex flex-col justify-between",
      ].join(" ")}
    >
      {/* gradient blobs */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-gradient-accent opacity-10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

      {/* content */}
      <article className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary shadow-soft flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>

          {!isPreviousMeeting && (
            <span className="px-2.5 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
              Upcoming
            </span>
          )}
          {isPreviousMeeting && (
            <span className="px-2.5 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
              Previous
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </article>

      {/* actions */}
      {!isPreviousMeeting && (
        <article className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6">
          <Button
            className="h-11 px-5 bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft"
            onClick={handleClick}
          >
            {ButtonIcon1 && (
              <ButtonIcon1 size={18} strokeWidth={1.8} className="mr-2" />
            )}
            {buttonText ?? "Start"}
          </Button>

          <Button
            variant="outline"
            className="h-11 px-5 border-border/60 bg-background/40 hover:bg-background/70"
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast({ title: "Link Copied" });
            }}
          >
            <Copy size={18} strokeWidth={1.8} className="mr-2" />
            Copy Link
          </Button>
        </article>
      )}
    </section>
  );
};

export default MeetingCard;
