"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import { features, testimonials } from "@/src/lib/mockdata";
import FeatureCard from "@/src/components/new/FeatureCard";
import { useMemo, useState } from "react";
import { Mic, MicOff, Video, VideoOff, ScreenShare, Crown } from "lucide-react";
import Navbar from "../components/Navbar";


const Landing = () => {
  const people = useMemo(
    () => [
      { name: "Aarav", role: "Host", mic: true, cam: true, badge: "Host" },
      { name: "Sara", role: "Design", mic: false, cam: true, badge: "Sharing" },
      { name: "Kunal", role: "Dev", mic: true, cam: false, badge: "Speaking" },
      { name: "Meera", role: "PM", mic: true, cam: true, badge: "Active" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                The future of video calling
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              Connect with anyone, <span className="text-gradient">anywhere</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Experience crystal-clear video meetings with Connecto. Simple, secure,
              and designed for modern teams who value quality.
            </motion.p>

            {/* Auth CTAs only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft hover:shadow-hover px-8 h-12 text-base"
                >
                  Create account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-secondary/50 px-8 h-12 text-base"
                >
                  Sign in
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-3xl bg-card shadow-card border border-border/50 overflow-hidden">
              {/* Ambient glassy background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-background to-secondary/30" />
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

              <div className="relative p-6 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <p className="text-sm text-muted-foreground">
                      Live preview · 00:24
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
                      🔒 Encrypted
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
                      HD
                    </span>
                  </div>
                </div>

                {/* Tiles */}
                <div className="grid grid-cols-2 gap-4">
                  {people.map((p, idx) => {
                    const isActive = idx === active;

                    return (
                      <motion.button
                        key={p.name}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onFocus={() => setActive(idx)}
                        className={[
                          "group relative text-left rounded-2xl overflow-hidden border",
                          "bg-background/30 backdrop-blur-md",
                          "transition-shadow focus:outline-none",
                          isActive
                            ? "border-primary/40 shadow-hover"
                            : "border-border/40 shadow-soft hover:shadow-hover",
                        ].join(" ")}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {/* Fake video texture */}
                        <div className="absolute inset-0 opacity-70">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.12),transparent_35%,rgba(236,72,153,0.10))]" />
                          <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_2px,transparent_6px)]" />
                        </div>

                        <div className="relative p-4 min-h-[160px] flex flex-col justify-between">
                          {/* Name + role */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-foreground leading-none">
                                {p.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {p.role}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {p.badge === "Host" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                                  <Crown className="w-3.5 h-3.5" />
                                  Host
                                </span>
                              )}
                              {p.badge === "Sharing" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-accent/10 text-accent-foreground border border-accent/20">
                                  <ScreenShare className="w-3.5 h-3.5" />
                                  Sharing
                                </span>
                              )}
                              {p.badge === "Speaking" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                  Speaking
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Avatar + status */}
                          <div className="flex items-end justify-between">
                            {/* Avatar */}
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-primary/30 border border-border/40 flex items-center justify-center">
                                <span className="text-sm font-semibold text-foreground">
                                  {p.name.slice(0, 1)}
                                </span>
                              </div>

                              {/* Animated soundwave for active tile */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    className="flex items-end gap-1 h-6"
                                  >
                                    {[1, 2, 3, 4, 5].map((b) => (
                                      <motion.span
                                        key={b}
                                        className="w-1 rounded-full bg-primary/70"
                                        animate={{ height: [6, 20, 10, 18, 8] }}
                                        transition={{
                                          duration: 1.1,
                                          repeat: Infinity,
                                          repeatType: "mirror",
                                          delay: b * 0.08,
                                        }}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Mic/Cam pills */}
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
                                {p.mic ? (
                                  <Mic className="w-3.5 h-3.5" />
                                ) : (
                                  <MicOff className="w-3.5 h-3.5" />
                                )}
                                {p.mic ? "Mic" : "Muted"}
                              </span>

                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-muted/40 border border-border/40 text-muted-foreground">
                                {p.cam ? (
                                  <Video className="w-3.5 h-3.5" />
                                ) : (
                                  <VideoOff className="w-3.5 h-3.5" />
                                )}
                                {p.cam ? "Cam" : "Off"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Hover hint */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Bottom helper */}
                <p className="mt-5 text-sm text-muted-foreground text-center">
                  Hover a tile to focus the speaker preview ✨
                </p>
              </div>
            </div>

            {/* Decorative blocks */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-accent rounded-2xl shadow-soft -z-10 blur-sm opacity-50" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-primary rounded-2xl shadow-soft -z-10 blur-sm opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Built for teams who demand the best video experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature: any, index: number) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-hero">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Loved by teams worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our customers have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t: any, index: number) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card shadow-card border border-border/50"
              >
                <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative max-w-3xl mx-auto text-center p-10 md:p-14 rounded-3xl bg-gradient-primary overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 relative">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 relative">
              Sign up and start meeting in minutes.
            </p>

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 h-12 text-base shadow-lg"
                >
                  Sign up
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 px-8 h-12 text-base"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
