import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm py-8 px-4 gap-6">
      <div className="text-2xl font-extrabold text-blue-700 mb-8">
        Tulboxx Panel
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
        >
          Dashboard
        </Link>
        <Link
          href="/posts"
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
        >
          Posts
        </Link>
        <Link
          href="/settings"
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
        >
          Settings
        </Link>
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Tulboxx Panel
      </div>
    </aside>
  );
}
