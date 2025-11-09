import CallList from "@/src/components/CallList";
import React from "react";

const Recordings = () => {
  return (
    <section className="flex w-full flex-col gap-8 text-[var(--clr-text)]">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Recordings</h1>
        <p className="text-[var(--clr-muted)] text-sm">
          Review and manage your past meetings and recordings.
        </p>
      </header>

      <div className="card w-full shadow-[var(--elev-1)]">
        <CallList type="recordings" />
      </div>
    </section>
  );
};

export default Recordings;
