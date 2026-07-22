import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/providers/motion-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xai — Intelligence Workspace",
  description: "A high-fidelity interactive AI product experience transforming fragmented business data into clear decisions and coordinated action.",
  openGraph: {
    title: "Xai — Intelligence Workspace",
    description: "From raw signals to structured intelligence, actionable insight and controlled AI automation.",
    type: "website",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07080b" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>;
}
