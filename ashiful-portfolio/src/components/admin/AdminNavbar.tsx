"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiLogOut, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminNavbar({
  avatarUrl,
}: {
  avatarUrl?: string | null;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    router.replace("/admin/login");
  };

  const src = avatarUrl || "/profile.png";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-3 border-b border-[#3c3c3c] bg-[#252526] px-4">
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        title="View site"
        className="grid h-9 w-9 place-items-center rounded-full border border-[#3c3c3c] text-[#d4d4d4] transition hover:bg-[#2a2d2e] hover:text-[#9cdcfe]"
      >
        <FiEye className="h-4 w-4" />
      </Link>
      <button
        type="button"
        title="Theme (coming soon)"
        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        className="grid h-9 w-9 place-items-center rounded-full border border-[#3c3c3c] text-[#d4d4d4] transition hover:bg-[#2a2d2e]"
      >
        {theme === "dark" ? (
          <FiMoon className="h-4 w-4" />
        ) : (
          <FiSun className="h-4 w-4" />
        )}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full border border-[#3c3c3c] py-1 pl-1 pr-3 transition hover:bg-[#2a2d2e]"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-[#007acc]/50">
            <Image
              src={src}
              alt={user?.username ?? "Admin"}
              fill
              unoptimized={src.startsWith("http")}
              className="object-cover"
              sizes="32px"
            />
          </span>
          <span className="text-sm font-medium text-[#d4d4d4]">Admin</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] py-1 shadow-xl shadow-black/40">
            <p className="truncate px-3 py-2 text-xs text-[#858585]">
              {user?.email}
            </p>
            <Link
              href="/admin/profiles"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#d4d4d4] hover:bg-[#2a2d2e]"
            >
              <FiUser className="h-4 w-4 text-[#9cdcfe]" />
              Profile
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#f14c4c] hover:bg-[#2a2d2e]"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
