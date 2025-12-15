"use client";
import { Button } from "@/src/components/ui/button";
import { Video } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow duration-300">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Connecto</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {!isLanding && (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upcoming-meetings"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Meetings
              </Link>
              <Link
                href="/recordings"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Recordings
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isLanding ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                Start Meeting
              </Button>
            </Link>
          ) : (
            <Link href="/start-meeting">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                New Meeting
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
