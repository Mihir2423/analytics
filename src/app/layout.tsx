import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { TailwindIndicator } from "@/components/globals/tailwind-indicator";
import { satoshi } from "./fonts/satoshi";

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
      <body className={`${satoshi.className} a antialiased`}>
        <Provider>
          {children}
          <TailwindIndicator />
        </Provider>
      </body>
    </html>
  );
}
