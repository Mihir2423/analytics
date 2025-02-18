import { ComponentWrapper } from "@/components/globals/component-wrapper";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard 💵 | Real-time bidding platform",
  description: "Bidding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-900 h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="md:hidden block">
          <Navbar />
        </div>
        <main className="flex-1 bg-gray-900 p-4 overflow-y-auto">
          <ComponentWrapper>{children}</ComponentWrapper>
        </main>
      </div>
    </div>
  );
}
