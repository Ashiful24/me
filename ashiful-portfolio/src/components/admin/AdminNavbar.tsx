"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import AdminThemeToggle from "./AdminThemeToggle";

export default function AdminNavbar({
  avatarUrl,
}: {
  avatarUrl?: string | null;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-panel)] px-4">
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        title="View site"
        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--admin-border)] text-[var(--admin-text)] transition hover:bg-[var(--admin-hover)] hover:text-[var(--admin-accent)]"
      >
        <FiEye className="h-4 w-4" />
      </Link>
      <AdminThemeToggle />

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full border border-[var(--admin-border)] py-1 pl-1 pr-3 transition hover:bg-[var(--admin-hover)]"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-[var(--admin-focus)]/50">
            <Image
              src={src}
              alt={user?.username ?? "Admin"}
              fill
              unoptimized={src.startsWith("http")}
              className="object-cover"
              sizes="32px"
            />
          </span>
          <span className="text-sm font-medium text-[var(--admin-text)]">
            Admin
          </span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] py-1 shadow-xl">
            <p className="truncate px-3 py-2 text-xs text-[var(--admin-muted)]">
              {user?.email}
            </p>
            <Link
              href="/admin/profiles"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--admin-text)] hover:bg-[var(--admin-hover)]"
            >
              <FiUser className="h-4 w-4 text-[var(--admin-accent)]" />
              Profile
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--admin-danger)] hover:bg-[var(--admin-hover)]"
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
