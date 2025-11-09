"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="cursor-pointer sm:hidden text-[var(--clr-text)]" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="border-none bg-[var(--clr-bg)] text-[var(--clr-text)]"
          aria-describedby={undefined}
        >
          <VisuallyHidden>
            <h2>Navigation Menu</h2>
          </VisuallyHidden>

          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xl font-bold">
            Connecto
          </Link>

          <div className="flex h-[calc(100vh-90px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-1 pt-2">
                {navLinks.map(({ route, label, icon: Icon }) => {
                  const active =
                    pathname === route || pathname.startsWith(`${route}/`);
                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] transition-colors",
                          active
                            ? "bg-[var(--clr-subtle)] text-[var(--clr-text)]"
                            : "text-[var(--clr-muted)] hover:bg-[var(--clr-subtle)]"
                        )}
                      >
                        <Icon size={18} />
                        <span>{label}</span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
