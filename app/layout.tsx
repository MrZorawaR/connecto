import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const pk =
  process.env.CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connecto",
  description: "Seamless video meetings, redefined.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!pk) {
    console.error("Missing CLERK_PUBLISHABLE_KEY");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        publishableKey={pk!}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#1a1a1a",
            colorPrimary: "#2563eb",
            colorBackground: "#ffffff",
            colorInputBackground: "#f5f5f5",
            colorInputText: "#1a1a1a",
            borderRadius: "0.5rem",
          },
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-50 text-neutral-900 selection:bg-blue-100 selection:text-blue-800`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
