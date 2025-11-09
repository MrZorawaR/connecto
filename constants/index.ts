// constants/index.ts
import { Home, CalendarDays, Video, ContactRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  route: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { label: "Home",          route: "/",            icon: Home },
  { label: "Upcoming",      route: "/upcoming",    icon: CalendarDays },
  { label: "Recordings",    route: "/recordings",  icon: Video },
  { label: "Personal Room", route: "/personal-room", icon: ContactRound },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];