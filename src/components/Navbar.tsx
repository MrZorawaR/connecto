"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { Button } from "./ui/button";
const Navbar = () => {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  return (
   <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-border/40",
        "bg-background/70 backdrop-blur-md"
        // If you have a `glass` class in CSS, you can replace the above with `glass`
      )}
    >
      <div className="mx-auto h-16 max-w-screen-2xl px-4 lg:h-20 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow duration-300">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Connecto</span>
        </Link>

        {/* Desktop nav (only inside app) */}
        {!isLanding && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const active =
                pathname === item.route || pathname.endsWith(item.route);

              return (
                <Link
                  key={item.route}
                  href={item.route}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Landing: only auth buttons */}
          {isLanding ? (
            <>
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                    Sign up
                  </Button>
                </Link>
              </SignedOut>

              {/* If user is already signed in on landing, show dashboard shortcut */}
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                    Go to Dashboard
                  </Button>
                </Link>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <>
              {/* Inside app: New Meeting + User */}

              <SignedIn>
                <UserButton />
              </SignedIn>

              {/* Mobile menu trigger */}
              <MobileNav />
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
