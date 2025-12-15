"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader2, Video } from "lucide-react";
import { motion } from "framer-motion";

import { useGetCallById } from "@/src/hooks/useGetCallById";
import Alert from "@/src/components/Alert";
import MeetingSetup from "@/src/components/MeetingSetup";
import MeetingRoom from "@/src/components/MeetingRoom";

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen w-full bg-background text-foreground">
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div
        className="absolute bottom-24 left-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div className="relative min-h-screen">{children}</div>
    </div>
  </main>
);

const CenterState = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => (
  <div className="min-h-screen w-full px-4 py-10 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="glass w-full max-w-xl rounded-3xl border border-border/50 shadow-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
          <Video className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      </div>

      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}

      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  </div>
);

const MeetingPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) {
    return (
      <PageShell>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="glass rounded-3xl border border-border/50 shadow-card px-6 py-5 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm sm:text-base text-muted-foreground">
              Preparing your meeting…
            </span>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!call) {
    return (
      <PageShell>
        <CenterState
          title="Call not found"
          subtitle="This meeting link may be invalid or expired."
        />
      </PageShell>
    );
  }

  const isUserAllowed =
    call.type !== "invited" ||
    (user && call.state?.members?.some((m) => m.user?.id === user.id));

  if (!isUserAllowed) {
    return (
      <PageShell>
        <CenterState
          title="Access denied"
          subtitle="You’re not allowed to join this meeting."
        >
          <Alert title="You are not allowed to join this meeting" />
        </CenterState>
      </PageShell>
    );
  }

  return (
    <PageShell>
      
      <div className="min-h-screen w-full px-2 sm:px-4 py-2 sm:py-4">
        <div className="mx-auto h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] max-w-7xl">
          <div className="">
            <StreamCall call={call}>
              <StreamTheme>
                {!isSetupComplete ? (
                  <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                ) : (
                  <MeetingRoom />
                )}
              </StreamTheme>
            </StreamCall>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default MeetingPage;
