import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
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
            href="/dashboard/posts"
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
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="text-lg font-bold text-blue-700">Dashboard</div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
              Admin
            </span>
          </div>
        </header>
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-400 py-4">
          &copy; {new Date().getFullYear()} Tulboxx Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
