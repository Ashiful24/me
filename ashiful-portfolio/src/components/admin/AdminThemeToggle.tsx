"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useAdminTheme } from "@/contexts/AdminThemeContext";

export default function AdminThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <button
      type="button"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={
        className ??
        "grid h-9 w-9 place-items-center rounded-full border border-[var(--admin-border)] text-[var(--admin-text)] transition hover:bg-[var(--admin-hover)]"
      }
    >
      {theme === "dark" ? (
        <FiSun className="h-4 w-4" />
      ) : (
        <FiMoon className="h-4 w-4" />
      )}
    </button>
  );
}
