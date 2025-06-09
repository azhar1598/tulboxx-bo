import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {pathname.startsWith("/posts/") ? (
        <Link
          href="/posts"
          className=" bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-base shadow-md transition"
        >
          Back to Posts
        </Link>
      ) : (
        <div className="text-lg font-bold text-blue-700">Dashboard</div>
      )}
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
          Admin
        </span>
      </div>
    </header>
  );
}
