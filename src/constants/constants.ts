// constants/index.ts
import { Home, CalendarDays, Video, ContactRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  route: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { label: "Home",          route: "/dashboard",            icon: Home },
  { label: "Upcoming",      route: "/dashboard/upcoming",    icon: CalendarDays },
  { label: "Recordings",    route: "/dashboard/recordings",  icon: Video },
  { label: "Personal Room", route: "/dashboard/personal-room", icon: ContactRound },
];
