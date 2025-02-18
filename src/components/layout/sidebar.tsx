"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
 Bot,
  ChevronLeft,
  ChevronRight,
  Crown,
  Hammer,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const session = useSession();
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-background transition-all duration-300 flex flex-col h-full pb-4`}
    >
      <div className="flex justify-between items-center gap-2 p-4 pr-0">
        <Image src="/logo.png" alt="logo" width={36} height={36} />
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <LayoutDashboard size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/auction"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <Hammer size={20} />
              {!isCollapsed && <span>Auction</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/wins"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <Crown size={20} />
              {!isCollapsed && <span>Winnings</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <Bot size={20} />
              {!isCollapsed && <span>Chat Bot</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
        >
          <Avatar>
            <AvatarImage
              src={session?.data?.user?.image ?? "/avatar.png"}
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {session?.data?.user?.name || "N/A"}
              </p>
              <p className="text-muted-foreground text-xs truncate">
                {session?.data?.user?.email || "N/A"}
              </p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={async () => await signOut()}
          size="sm"
          className={`mt-2 text-left w-fit ${isCollapsed ? "p-2" : ""}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
