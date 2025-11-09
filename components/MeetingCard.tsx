"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="card xl:max-w-[568px] min-h-[258px] w-full flex flex-col justify-between rounded-[var(--radius-md)]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="meeting type" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[var(--clr-text)]">{title}</h2>
            <p className="text-sm text-[var(--clr-muted)]">{date}</p>
          </div>
        </div>
      </article>

      <article className={cn("relative flex items-center justify-between gap-4")}>
        {/* Attendee avatars (decorative) */}
        <div className="relative hidden w-full max-sm:hidden md:block">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendee"
              width={40}
              height={40}
              className={cn("rounded-full ring-2 ring-[var(--clr-bg)]", {
                absolute: index > 0,
              })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-[var(--clr-bg)] bg-[var(--clr-subtle)] text-[var(--clr-text)]">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="ml-auto flex gap-2">
            <Button
              variant="default"
              className="px-5"
              onClick={handleClick}
            >
              {buttonIcon1 && (
                <>
                  <Image src={buttonIcon1} alt="action" width={18} height={18} />
                  <span className="ml-2" />
                </>
              )}
              {buttonText ?? "Start"}
            </Button>

            <Button
              variant="outline"
              className="px-5"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({ title: "Link Copied" });
              }}
            >
              <Image src="/icons/copy.svg" alt="copy" width={18} height={18} />
              <span className="ml-2">Copy Link</span>
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
