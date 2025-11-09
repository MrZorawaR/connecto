import StreamVideoProvider from "@/providers/StreamClientProvider";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connecto",
  description: "Video Calling App",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StreamVideoProvider>
      <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </main>
    </StreamVideoProvider>
  );
}
