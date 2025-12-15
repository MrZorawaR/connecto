"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { navLinks } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { Menu, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const MobileNav = () => {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl",
              "border border-border/40 bg-background/60 backdrop-blur-md",
              "hover:bg-background/80 transition-colors"
            )}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className={cn(
            "border-none p-0",
            "bg-background/80 backdrop-blur-xl"
          )}
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <h2>Navigation Menu</h2>
          </VisuallyHidden>

          {/* Header */}
          <div className="p-5 border-b border-border/40">
            <SheetClose asChild>
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-hover transition-shadow duration-300">
                  <Video className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  Connecto
                </span>
              </Link>
            </SheetClose>

            <div className="mt-4">


              <SignedOut>
                <p className="text-sm text-muted-foreground">
                  Sign in to start meetings
                </p>
              </SignedOut>
            </div>
          </div>

          {/* Body */}
          <div className="flex h-[calc(100vh-88px)] flex-col justify-between">
            {/* Landing: only auth actions */}
            {isLanding ? (
              <div className="p-5 space-y-3">
                <SignedOut>
                  <SheetClose asChild>
                    <Link href="/sign-in">
                      <Button
                        variant="outline"
                        className="w-full border-border/50 bg-background/50 hover:bg-background/70"
                      >
                        Sign in
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/sign-up">
                      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                        Sign up
                      </Button>
                    </Link>
                  </SheetClose>
                </SignedOut>

                <SignedIn>
                  <SheetClose asChild>
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SheetClose>
                </SignedIn>
              </div>
            ) : (
              <>
                {/* App nav links */}
                <nav className="p-3 flex flex-col gap-1">
                  {navLinks.map(({ route, label, icon: Icon }) => {
                    const active =
                      pathname === route || pathname.endsWith(`${route}`);

                    return (
                      <SheetClose asChild key={route}>
                        <Link
                          href={route}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm",
                            "transition-colors",
                            active
                              ? "bg-primary/10 text-foreground border border-primary/15"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                          )}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Bottom actions */}
                <div className="p-5 border-t border-border/40 space-y-3">

                  <SignedOut>
                    <SheetClose asChild>
                      <Link href="/sign-in">
                        <Button
                          variant="outline"
                          className="w-full border-border/50 bg-background/50 hover:bg-background/70"
                        >
                          Sign in
                        </Button>
                      </Link>
                    </SheetClose>
                  </SignedOut>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
