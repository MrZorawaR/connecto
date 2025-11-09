"use client";

import { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // live time updater
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  }).format(currentTime);

  return (
    <section className="flex w-full flex-col gap-8 text-[var(--clr-text)]">
      {/* Hero panel */}
      <div className="relative h-[300px] w-full rounded-[var(--radius-lg)] bg-gradient-to-br from-[#f6f7fb] via-white to-[#edf0fa] overflow-hidden shadow">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.06),transparent_60%)]" />
        <div className="flex h-full flex-col justify-between px-6 py-8 lg:px-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-[var(--clr-muted)] lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
