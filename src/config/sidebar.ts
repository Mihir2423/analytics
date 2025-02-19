import { FolderGit2, LayoutDashboard, Settings } from "lucide-react";

interface SidebarLinkItem {
  href: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  iconColor: string;
  pattern: RegExp;
}

const sidebarLinks: SidebarLinkItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    iconColor: "#FF5733",
    pattern: /^\/dashboard/,
  },
  {
    href: "/projects",
    icon: FolderGit2,
    label: "Projects",
    iconColor: "#3d7682",
    pattern: /^\/projects/,
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    iconColor: "#30F273",
    pattern: /^\/settings/,
  },
];

export default sidebarLinks;
