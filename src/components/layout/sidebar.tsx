"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
 ChartNoAxesCombined,
 FolderGit2,
 LayoutDashboard,
 LogOut,
 PanelRightClose,
 PanelRightOpen,
 Settings
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
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
      } bg-gray-900 transition-all duration-300 flex flex-col h-full pb-4 border-r border-gray-700`}
    >
      <div className="flex justify-between items-center gap-2 p-4 pr-1">
        {!isCollapsed && (
          <ChartNoAxesCombined size={36} className="text-white" />
        )}
        {!isMobile && (
          <Button
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex hover:bg-gray-800 p-1 text-gray-300"
          >
            {isCollapsed ? (
              <PanelRightClose style={{ width: "24px", height: "24px" }} />
            ) : (
              <PanelRightOpen style={{ width: "24px", height: "24px" }} />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                isCollapsed ? "justify-center" : "space-x-3"
              } text-gray-300`}
            >
              <LayoutDashboard size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/auction"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                isCollapsed ? "justify-center" : "space-x-3"
              } text-gray-300`}
            >
              <FolderGit2 size={20} />
              {!isCollapsed && <span>Projects</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                isCollapsed ? "justify-center" : "space-x-3"
              } text-gray-300`}
            >
              <Settings size={20} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-gray-700 border-t">
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
