"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--clr-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Brand */}
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Connecto Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-extrabold text-[var(--clr-text)] max-sm:hidden">
            Connecto
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ route, label, icon: Icon }) => {
            const active =
              pathname === route || pathname.startsWith(`${route}/`);
            return (
              <li key={route}>
                <Link
                  href={route}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                    "transition-colors",
                    active
                      ? "bg-[var(--clr-subtle)] text-[var(--clr-text)] shadow-lg"
                      : "text-[var(--clr-muted)] hover:bg-[var(--clr-subtle)] shadow-sm"
                  )}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* Mobile menu trigger */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
