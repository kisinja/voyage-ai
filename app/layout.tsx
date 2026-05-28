// app/layout.tsx

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoyageAI — AI-Powered Travel Planner",
  description:
    "Generate hyper-personalized travel itineraries with AI. Powered by Groq for ultra-fast planning with real destination data, events, and hidden gems.",
  keywords: [
    "travel planner",
    "AI itinerary",
    "travel assistant",
    "trip planning",
  ],
  openGraph: {
    title: "VoyageAI — AI-Powered Travel Planner",
    description: "Your AI travel concierge, redefined.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
