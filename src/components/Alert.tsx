"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface AlertProps {
  title: string;
  iconUrl?: string; // kept for compatibility, but we won't use image now
}

const Alert = ({ title }: AlertProps) => {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border border-border/50 glass shadow-card">
          {/* subtle glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-primary shadow-soft flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-primary-foreground" />
              </div>

              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {title}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Please go back and try again.
                </p>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-3 sm:justify-center">
                <Button
                  asChild
                  className="h-11 px-5 bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft"
                >
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-5 border-border/60 bg-background/40 hover:bg-secondary/50"
                >
                  <Link href="/upcoming">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Alert;
