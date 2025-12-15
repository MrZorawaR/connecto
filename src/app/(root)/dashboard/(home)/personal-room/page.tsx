"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/hooks/use-toast";
import { useGetCallById } from "@/src/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Copy, User, Hash, Link as LinkIcon, Video } from "lucide-react";

const Row = ({
  icon: Icon,
  title,
  value,
  mono,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 h-10 w-10 rounded-xl bg-gradient-hero border border-border/50 flex items-center justify-center">
      <Icon className="h-5 w-5 text-foreground" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p
        className={`mt-0.5 truncate text-base font-semibold text-foreground ${
          mono ? "font-mono text-sm md:text-base" : ""
        }`}
        title={value}
      >
        {value}
      </p>
    </div>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;

  const meetingLink =
    meetingId
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
      : "";

  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user || !meetingId) return;

    const newCall = client.call("default", meetingId);

    if (!call) {
      await newCall.getOrCreate({
        data: { starts_at: new Date().toISOString() },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const copyInvite = async () => {
    if (!meetingLink) return;
    await navigator.clipboard.writeText(meetingLink);
    toast({ title: "Link Copied" });
  };

  return (
    <div className="bg-background">
      <main className="md:px-3">
        <div className="md:container mx-auto md:max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Personal Room
              </h1>
            </div>

            <p className="text-lg text-muted-foreground">
              Your always-available room. Start instantly or copy the invite link.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="glass rounded-3xl border border-border/50 shadow-card p-6 md:p-7"
          >
            {/* Details */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Row
                icon={User}
                title="Topic"
                value={`${user?.firstName ?? "Your"}'s Meeting Room`}
              />
              <Row icon={Hash} title="Meeting ID" value={meetingId ?? "—"} mono />
              <div className="md:col-span-2">
                <Row icon={LinkIcon} title="Invite Link" value={meetingLink || "—"} mono />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={startRoom}
                className="h-12 px-6 text-base bg-gradient-primary hover:opacity-90 transition-opacity shadow-soft"
              >
                <Video className="w-5 h-5 mr-2" />
                Start Meeting
              </Button>

              <Button
                variant="outline"
                onClick={copyInvite}
                className="h-12 px-6 text-base border-border/60 bg-background/40 hover:bg-secondary/50 hover:text-foreground/50 transition"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy Invitation
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PersonalRoom;
