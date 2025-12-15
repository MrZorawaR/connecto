"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import Link from "next/link";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;                // optional now
  onClick?: () => void;       // optional now
  gradient?: boolean;
  index: number;
}

const ActionCard = ({
  icon: Icon,
  title,
  description,
  to,
  onClick,
  gradient,
  index,
}: ActionCardProps) => {
  const content = (
    <Card
      className={`group relative p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-hover border-border/50 overflow-hidden ${
        gradient
          ? "bg-gradient-primary text-primary-foreground"
          : "bg-card hover:border-primary/30"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
          gradient
            ? "bg-primary-foreground/20 group-hover:bg-primary-foreground/30"
            : "bg-gradient-primary shadow-soft group-hover:shadow-glow"
        }`}
      >
        <Icon className={`w-7 h-7 ${gradient ? "text-primary-foreground" : "text-primary-foreground"}`} />
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${
          gradient
            ? "text-primary-foreground"
            : "text-foreground group-hover:text-primary"
        } transition-colors`}
      >
        {title}
      </h3>

      <p
        className={`text-sm leading-relaxed ${
          gradient ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>

      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 ${
          gradient ? "bg-primary-foreground" : "bg-primary"
        } group-hover:scale-150 transition-transform duration-500`}
      />
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {to ? (
        <Link href={to}>{content}</Link>
      ) : (
        <button type="button" onClick={onClick} className="w-full text-left">
          {content}
        </button>
      )}
    </motion.div>
  );
};

export default ActionCard;
