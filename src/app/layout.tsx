import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { TailwindIndicator } from "@/components/globals/tailwind-indicator";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Analytics",
  description: "Analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} a antialiased`}
      >
        <Provider>
          {children}
          <TailwindIndicator />
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
