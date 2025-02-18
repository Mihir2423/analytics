import { hexToRGBA } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  isCollapsed: boolean;
  iconColor: string;
  pattern: RegExp;
}

export const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  iconColor,
  pattern,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pattern.test(pathname);

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 rounded-lg text-sm
          ${isCollapsed ? "justify-center" : "space-x-3"}
          ${isActive ? `text-white` : "text-gray-300 hover:bg-[#1E1F23]"}
          transition-colors duration-200
        `}
        style={
          isActive ? { backgroundColor: hexToRGBA(iconColor, 0.15) } : undefined
        }
      >
        <Icon size={16} color={isActive ? iconColor : "#6B7280"} />
        {!isCollapsed && (
          <span
            style={{
              color: isActive ? iconColor : undefined,
            }}
          >
            {label}
          </span>
        )}
      </Link>
    </li>
  );
};
