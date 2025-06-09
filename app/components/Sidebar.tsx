import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: HomeIcon,
    },
    {
      href: "/clients",
      label: "Clients",
      icon: UserGroupIcon,
    },
    {
      href: "/posts",
      label: "Posts",
      icon: DocumentTextIcon,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm py-8 px-4 gap-6">
      <div className="text-2xl font-extrabold text-blue-700 mb-8">
        Tulboxx Panel
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Tulboxx Panel
      </div>
    </aside>
  );
}
