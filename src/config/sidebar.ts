import { LayoutDashboard, FolderGit2, Settings } from "lucide-react";

interface SidebarLinkItem {
  href: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  iconColor: string;
}

const sidebarLinks: SidebarLinkItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    iconColor: "#FF5733",
  },
  {
    href: "/projects",
    icon: FolderGit2,
    label: "Projects",
    iconColor: "#3357FF",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    iconColor: "#30F273",
  },
];

export default sidebarLinks;
