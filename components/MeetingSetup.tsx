"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();
  if (!call) throw new Error("useCall must be used within StreamCall component");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-[var(--clr-bg)] text-[var(--clr-text)]">
      <h1 className="text-3xl font-bold">Setup</h1>

      <div className="rounded-[var(--radius-lg)] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 shadow-[var(--elev-1)]">
        <VideoPreview />
      </div>

      <div className="flex h-16 flex-wrap items-center justify-center gap-4 text-[var(--clr-muted)]">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            className="h-4 w-4 accent-[var(--clr-primary)]"
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button
        variant="outline"
        className="px-6 py-2 text-base font-semibold shadow-[var(--elev-2)]"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </section>
  );
};

export default MeetingSetup;
