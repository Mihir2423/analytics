import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  isCollapsed: boolean;
  iconColor: string;
}

export const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  iconColor,
}: SidebarLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 rounded-lg text-sm hover:bg-[#1E1F23] ${
          isCollapsed ? "justify-center" : "space-x-3"
        } text-gray-300`}
      >
        <Icon size={16} color={iconColor} />
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  );
};
