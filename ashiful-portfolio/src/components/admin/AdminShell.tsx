"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_RESOURCES } from "@/lib/admin-resources";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <div className="flex min-h-screen">
        <aside className="flex w-64 shrink-0 flex-col border-r border-[#3c3c3c] bg-[#252526]">
          <div className="border-b border-[#3c3c3c] px-4 py-4">
            <p className="font-mono text-xs text-[#858585]">admin.panel</p>
            <h1 className="mt-1 text-lg font-semibold text-[#9cdcfe]">
              Portfolio Admin
            </h1>
            <p className="mt-1 truncate text-xs text-[#858585]">
              {user?.email}
            </p>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
            <Link
              href="/admin"
              className={`block rounded px-3 py-2 text-sm ${
                pathname === "/admin"
                  ? "bg-[#094771] text-white"
                  : "hover:bg-[#2a2d2e]"
              }`}
            >
              Dashboard
            </Link>
            {ADMIN_RESOURCES.map((resource) => {
              const href = `/admin/resources/${resource.key}`;
              const active = pathname === href;
              return (
                <Link
                  key={resource.key}
                  href={href}
                  className={`block rounded px-3 py-2 text-sm ${
                    active ? "bg-[#094771] text-white" : "hover:bg-[#2a2d2e]"
                  }`}
                >
                  {resource.label}
                </Link>
              );
            })}
            <Link
              href="/admin/profiles"
              className={`block rounded px-3 py-2 text-sm ${
                pathname === "/admin/profiles"
                  ? "bg-[#094771] text-white"
                  : "hover:bg-[#2a2d2e]"
              }`}
            >
              Profiles
            </Link>
          </nav>
          <div className="space-y-2 border-t border-[#3c3c3c] p-3">
            <Link
              href="/"
              className="block rounded px-3 py-2 text-sm text-[#9cdcfe] hover:bg-[#2a2d2e]"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded bg-[#3c3c3c] px-3 py-2 text-left text-sm hover:bg-[#4e4e4e]"
            >
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
