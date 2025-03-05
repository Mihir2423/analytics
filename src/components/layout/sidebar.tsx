"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import sidebarLinks from "@/config/sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ChartNoAxesCombined,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { SidebarLink } from "./sidebar-links";
import { useSidebar } from "@/contexts/sidebar-context";
import Link from "next/link";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const session = useSession();

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-56"
      } bg-black transition-all duration-300 flex flex-col h-full pb-0`}
    >
      <div className="flex justify-between items-center gap-2 p-4 pr-0">
        {!isCollapsed && (
          <Link href="/">
            <ChartNoAxesCombined size={36} className="text-white" />
          </Link>
        )}
        {!isMobile && (
          <Button
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex bg-transparent hover:bg-[#1E1F23] p-1 text-gray-300"
          >
            {isCollapsed ? (
              <PanelRightClose style={{ width: "20px", height: "20px" }} />
            ) : (
              <PanelRightOpen style={{ width: "20px", height: "20px" }} />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} {...link} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-gray-800 border-t">
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
              <p className="font-medium text-white text-sm truncate">
                {session?.data?.user?.name || "N/A"}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {session?.data?.user?.email || "N/A"}
              </p>
            </div>
          )}
        </div>
        <Button
          onClick={async () => await signOut()}
          size="sm"
          className={`mt-2 text-left w-fit bg-transparent text-sm hover:bg-transparent ${
            isCollapsed ? "p-2" : ""
          } text-red-700 `}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
