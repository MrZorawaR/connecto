import { cn } from "@/src/lib/utils";
import React from "react";
import type { LucideIcon } from "lucide-react";

interface HomeCardProps {
  className?: string;
  icon: LucideIcon;  
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  icon: Icon,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      onClick={handleClick}
      className={cn(
        "card cursor-pointer transition-all duration-200 hover:shadow-[var(--elev-2)] hover:-translate-y-[2px]",
        "px-5 py-6 flex flex-col justify-between min-h-[250px] rounded-[var(--radius-md)]",
        className
      )}
    >
      <div className="flex-center size-12 rounded-[var(--radius-sm)] bg-[var(--clr-subtle)] border border-[var(--clr-border)] shadow-sm">
        <Icon size={28} strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[var(--clr-text)]">{title}</h1>
        <p className="text-[15px] text-[var(--clr-muted)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
