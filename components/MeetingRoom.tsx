/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[var(--clr-bg)] text-[var(--clr-text)]">
      {/* Main video layout */}
      <div className="relative flex size-full items-center justify-center pt-4">
        <div className="flex size-full max-w-[1100px] items-center justify-center">
          <CallLayout />
        </div>

        <div
          className={cn(
            "h-[calc(100vh-90px)] hidden ml-2 transition-all",
            showParticipants && "show-block"
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5 border-t border-[var(--clr-border)] bg-[var(--clr-surface)]/95 px-4 py-3 backdrop-blur-md">
        <CallControls onLeave={() => router.push("/")} />

        {/* Layout selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md bg-[var(--clr-subtle)] px-3 py-2 text-[var(--clr-text)] shadow-sm transition hover:bg-[var(--clr-border)]/40">
            <LayoutList size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-[var(--clr-border)] bg-[var(--clr-surface)] text-[var(--clr-text)] shadow-[var(--elev-2)] rounded-[var(--radius-md)]">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item) => (
              <div key={item}>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[var(--clr-subtle)]"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-[var(--clr-border)]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        {/* Participants toggle */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="rounded-md bg-[var(--clr-subtle)] px-3 py-2 transition hover:bg-[var(--clr-border)]/40"
        >
          <Users size={18} />
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
