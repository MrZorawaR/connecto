"use client";

import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Video, MicOff, Settings2, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [joinWithMicCamOff, setJoinWithMicCamOff] = useState(false);

  const call = useCall();
  if (!call) throw new Error("useCall must be used within StreamCall component");

  useEffect(() => {
    if (joinWithMicCamOff) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinWithMicCamOff]);

  const join = async () => {
    await call.join();
    setIsSetupComplete(true);
  };

  return (
    <section className="w-full flex items-center justify-center px-4 py-6 min-h-[calc(100vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <div className="glass rounded-3xl border border-border/50 shadow-card">
          <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-border/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.18),transparent_55%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary shadow-soft flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    Setup your devices
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check your camera and mic before joining.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
                <Settings2 className="h-4 w-4" />
                Choose devices
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_.65fr] gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-soft"
              >
                <div className="absolute inset-0 bg-gradient-hero opacity-70" />
                <div className="relative p-3 sm:p-4">
                  <VideoPreview />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="rounded-2xl border border-border/50 bg-card/70 backdrop-blur p-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={joinWithMicCamOff}
                      onChange={(e) => setJoinWithMicCamOff(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <MicOff className="h-4 w-4" />
                        Join with mic & camera off
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You can enable them anytime inside the meeting.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/70 backdrop-blur p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold text-foreground">
                      Device settings
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Camera / Mic / Speakers
                    </span>
                  </div>

                  <div
                    className={cn(
                      "stream-device-settings",
                      "[&_\\.str-video__device-settings__device-selector-title]:text-white",
                      "[&_\\.str-video__device-settings__option]:text-white/75",
                      "[&_\\.str-video__device-settings__option--selected]:text-white"
                    )}
                  >
                    <DeviceSettings />
                  </div>
                </div>

                <Button
                  onClick={join}
                  className="h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft"
                >
                  Join Meeting
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By joining, you agree to your team’s meeting policies.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MeetingSetup;
