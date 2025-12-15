"use client";

import { motion } from "framer-motion";
import {
  Play,
  Clock,
  HardDrive,
  MoreVertical,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useToast } from "@/src/hooks/use-toast";
import { cn } from "@/src/lib/utils";

type StreamRecordingLite = {
  url: string;
  start_time: string;
  end_time: string;
  filename: string;
  session_id: string;
  recording_type: string;
};

interface RecordingCardProps {
  recording: StreamRecordingLite;
  index: number;
}

function formatDate(input?: string) {
  if (!input) return "Unknown date";
  const d = new Date(input);
  return isNaN(d.getTime()) ? input : d.toLocaleString();
}

function durationSeconds(start?: string, end?: string) {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (isNaN(s) || isNaN(e) || e <= s) return 0;
  return Math.max(0, Math.floor((e - s) / 1000));
}

function formatDuration(sec: number) {
  if (!sec) return "—";
  const s = sec % 60;
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  const pad = (x: number) => String(x).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function prettifyFilename(name?: string) {
  if (!name) return "Meeting Recording";
  const base = name.replace(/\.[^/.]+$/, "");
  const parts = base.split("_");
  const quality = parts.find((p) => p.endsWith("p")) ?? "";
  return quality ? `Recording (${quality})` : "Meeting Recording";
}

const themes = [
  { a: "rgba(79,70,229,0.22)", b: "rgba(14,165,233,0.16)" }, // indigo -> sky
  { a: "rgba(30,64,175,0.22)", b: "rgba(34,211,238,0.14)" }, // blue -> cyan
  { a: "rgba(99,102,241,0.20)", b: "rgba(56,189,248,0.14)" }, // indigo -> sky
  { a: "rgba(59,130,246,0.20)", b: "rgba(45,212,191,0.12)" }, // blue -> teal
];

function RecordingVector({ index }: { index: number }) {
  const t = themes[index % themes.length];

  // deterministic variation for tiny dots
  const seed = (index * 37) % 100;
  const dot1x = 70 + (seed % 24);
  const dot2x = 730 - (seed % 30);

  return (
    <svg
      viewBox="0 0 800 450"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.a} />
          <stop offset="1" stopColor={t.b} />
        </linearGradient>

        <linearGradient id={`tile-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>

        <filter id={`blur-${index}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* background */}
      <rect width="800" height="450" fill={`url(#bg-${index})`} />

      {/* soft blobs (cool tone only) */}
      <circle cx="650" cy="90" r="110" fill="rgba(79,70,229,0.18)" filter={`url(#blur-${index})`} />
      <circle cx="140" cy="380" r="140" fill="rgba(56,189,248,0.14)" filter={`url(#blur-${index})`} />

      {/* top bar */}
      <rect
        x="32"
        y="28"
        width="736"
        height="52"
        rx="18"
        fill="rgba(255,255,255,0.10)"
        stroke="rgba(255,255,255,0.14)"
      />
      <circle cx="70" cy="54" r="10" fill="rgba(255,255,255,0.22)" />
      <rect x="92" y="44" width="200" height="20" rx="10" fill="rgba(255,255,255,0.14)" />

      {/* status dots */}
      <circle cx={dot1x} cy="420" r="6" fill="rgba(255,255,255,0.26)" />
      <circle cx={dot2x} cy="420" r="6" fill="rgba(255,255,255,0.26)" />

      {/* 2x2 participant grid */}
      {[
        { x: 52, y: 104 },
        { x: 410, y: 104 },
        { x: 52, y: 268 },
        { x: 410, y: 268 },
      ].map((p, i) => (
        <g key={i}>
          <rect
            x={p.x}
            y={p.y}
            width="338"
            height="148"
            rx="22"
            fill={`url(#tile-${index})`}
            stroke="rgba(255,255,255,0.20)"
          />

          {/* avatar */}
          <circle cx={p.x + 70} cy={p.y + 66} r="28" fill="rgba(255,255,255,0.28)" />
          <circle cx={p.x + 60} cy={p.y + 62} r="3.6" fill="rgba(15,23,42,0.55)" />
          <circle cx={p.x + 80} cy={p.y + 62} r="3.6" fill="rgba(15,23,42,0.55)" />
          <path
            d={`M ${p.x + 58} ${p.y + 78} Q ${p.x + 70} ${p.y + 88} ${p.x + 82} ${p.y + 78}`}
            stroke="rgba(15,23,42,0.55)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* name bars */}
          <rect x={p.x + 120} y={p.y + 44} width="190" height="14" rx="7" fill="rgba(255,255,255,0.22)" />
          <rect x={p.x + 120} y={p.y + 68} width="130" height="12" rx="6" fill="rgba(255,255,255,0.16)" />

          {/* mic/cam dots */}
          <circle cx={p.x + 298} cy={p.y + 48} r="6.5" fill="rgba(255,255,255,0.26)" />
          <circle cx={p.x + 320} cy={p.y + 48} r="6.5" fill="rgba(255,255,255,0.26)" />
        </g>
      ))}
    </svg>
  );
}

const RecordingCard = ({ recording, index }: RecordingCardProps) => {
  const { toast } = useToast();

  const title = prettifyFilename(recording.filename);
  const date = formatDate(recording.start_time);
  const durSeconds = durationSeconds(recording.start_time, recording.end_time);
  const dur = formatDuration(durSeconds);
  const typeLabel = recording.recording_type || "—";

  const open = () => window.open(recording.url, "_blank", "noopener,noreferrer");

  const copy = async () => {
    await navigator.clipboard.writeText(recording.url);
    toast({ title: "Link Copied" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden bg-card hover:shadow-hover transition-all duration-300 border-border/50 group">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden flex items-center justify-center bg-gradient-hero">
          <RecordingVector index={index} />

          {/* MUCH lighter overlay so grid is visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {/* Play button */}
          <Button
            size="icon"
            onClick={open}
            className={cn(
              "relative w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-glow",
              "opacity-0 group-hover:opacity-100 transition-all duration-300",
              "scale-90 group-hover:scale-100"
            )}
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </Button>

          {/* Duration */}
          <span className="absolute bottom-3 right-3 text-xs font-medium bg-foreground/80 text-background px-2 py-1 rounded-md">
            {dur}
          </span>

          {/* Type chip */}
          <span className="absolute bottom-3 left-3 text-xs font-medium bg-background/70 text-foreground px-2 py-1 rounded-md border border-border/40 backdrop-blur flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5" />
            {typeLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {title}
              </h3>

              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="truncate">{date}</span>
                </div>

              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={open}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </DropdownMenuItem>

                <DropdownMenuItem onClick={copy}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mt-3 text-xs text-muted-foreground truncate">
            {recording.filename}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecordingCard;
