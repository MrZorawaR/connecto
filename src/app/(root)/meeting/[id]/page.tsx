"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

import { useGetCallById } from "@/src/hooks/useGetCallById";
import Alert from "@/src/components/Alert";
import MeetingSetup from "@/src/components/MeetingSetup";
import MeetingRoom from "@/src/components/MeetingRoom";

const MeetingPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--clr-bg)]">
        <Loader className="h-10 w-10 animate-spin text-[var(--clr-primary)]" />
      </div>
    );

  if (!call)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[var(--clr-bg)] text-[var(--clr-text)]">
        <p className="text-2xl font-semibold">Call Not Found</p>
      </div>
    );

  const isUserAllowed =
    call.type !== "invited" ||
    (user && call.state?.members?.some((m) => m.user?.id === user.id));

  if (!isUserAllowed)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--clr-bg)] text-[var(--clr-text)]">
        <Alert title="You are not allowed to join this meeting" />
      </div>
    );

  return (
    <main className="h-screen w-full bg-[var(--clr-bg)] text-[var(--clr-text)]">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
