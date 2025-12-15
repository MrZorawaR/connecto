export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  size: string;
}

export const upcomingMeetings: Meeting[] = [
  {
    id: "1",
    title: "Product Design Review",
    date: "Dec 15, 2025",
    time: "10:00 AM",
    duration: "1 hour",
    host: "Sarah Chen",
    participants: 8,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Weekly Team Standup",
    date: "Dec 16, 2025",
    time: "9:00 AM",
    duration: "30 min",
    host: "Alex Johnson",
    participants: 12,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Client Presentation",
    date: "Dec 17, 2025",
    time: "2:00 PM",
    duration: "45 min",
    host: "Michael Park",
    participants: 5,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Engineering Sync",
    date: "Dec 18, 2025",
    time: "11:00 AM",
    duration: "1 hour",
    host: "Emily Davis",
    participants: 6,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Quarterly Planning",
    date: "Dec 20, 2025",
    time: "3:00 PM",
    duration: "2 hours",
    host: "David Kim",
    participants: 15,
    status: "upcoming",
  },
];

export const pastRecordings: Recording[] = [
  {
    id: "1",
    title: "Q3 Strategy Meeting",
    date: "Dec 1, 2025",
    duration: "1h 23m",
    thumbnail: "/placeholder.svg",
    size: "245 MB",
  },
  {
    id: "2",
    title: "Design System Workshop",
    date: "Nov 28, 2025",
    duration: "2h 15m",
    thumbnail: "/placeholder.svg",
    size: "412 MB",
  },
  {
    id: "3",
    title: "Product Demo - Beta Launch",
    date: "Nov 25, 2025",
    duration: "45m",
    thumbnail: "/placeholder.svg",
    size: "156 MB",
  },
  {
    id: "4",
    title: "Team Retrospective",
    date: "Nov 22, 2025",
    duration: "1h 10m",
    thumbnail: "/placeholder.svg",
    size: "198 MB",
  },
  {
    id: "5",
    title: "Investor Pitch Practice",
    date: "Nov 18, 2025",
    duration: "35m",
    thumbnail: "/placeholder.svg",
    size: "124 MB",
  },
  {
    id: "6",
    title: "Onboarding Session",
    date: "Nov 15, 2025",
    duration: "1h 45m",
    thumbnail: "/placeholder.svg",
    size: "320 MB",
  },
];

export const features = [
  {
    icon: "Video",
    title: "HD Video Quality",
    description: "Crystal clear video with adaptive bitrate for smooth streaming on any connection.",
  },
  {
    icon: "Zap",
    title: "Lightning Fast",
    description: "Connect instantly with our optimized infrastructure. No downloads required.",
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description: "End-to-end encryption ensures your meetings stay private and secure.",
  },
  {
    icon: "Film",
    title: "Cloud Recording",
    description: "Record meetings with one click and access them anytime from anywhere.",
  },
];

export const testimonials = [
  {
    quote: "Connecto transformed how our remote team collaborates. The quality is unmatched.",
    author: "Jessica Williams",
    role: "CEO, TechFlow",
    avatar: "JW",
  },
  {
    quote: "Simple, beautiful, and just works. Exactly what we needed for our daily standups.",
    author: "Marcus Chen",
    role: "Engineering Lead, Startup",
    avatar: "MC",
  },
  {
    quote: "The recording feature has been a game-changer for our training sessions.",
    author: "Amanda Foster",
    role: "HR Director, Enterprise Co",
    avatar: "AF",
  },
];
