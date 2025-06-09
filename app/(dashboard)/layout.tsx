"use client";
import React from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";
import Header from "../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex bg-gray-50">
      {!pathname.startsWith("/posts/") && <Sidebar />}
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />
        <main
          className={`flex-1 w-full ${
            pathname.startsWith("/posts/") ? "max-w-full" : "max-w-6xl"
          } mx-auto px-4 py-8`}
        >
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
