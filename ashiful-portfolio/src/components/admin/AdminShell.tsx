"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiBarChart2,
  FiBriefcase,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCode,
  FiFolder,
  FiGrid,
  FiLayers,
  FiMail,
  FiMessageSquare,
  FiSettings,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_RESOURCES } from "@/lib/admin-resources";
import { apiFetch } from "@/lib/api";
import AdminNavbar from "./AdminNavbar";

const RESOURCE_ICONS: Record<string, IconType> = {
  services: FiSettings,
  "timeline-entries": FiClock,
  testimonials: FiMessageSquare,
  "contact-links": FiMail,
  users: FiUsers,
};

const SIDEBAR_KEY = "admin-sidebar-collapsed";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const skillsActive = pathname.startsWith("/admin/skills");
  const groupsSelected = pathname === "/admin/skills/groups";
  const skillsSelected = pathname === "/admin/skills";
  const [skillsOpen, setSkillsOpen] = useState(skillsActive);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (skillsActive) setSkillsOpen(true);
  }, [skillsActive]);

  useEffect(() => {
    if (!user?.id) return;
    void apiFetch<{ avatarUrl?: string }[]>(
      `/profiles?userId=${encodeURIComponent(user.id)}`,
    )
      .then((profiles) => {
        if (profiles[0]?.avatarUrl) setAvatarUrl(profiles[0].avatarUrl);
      })
      .catch(() => {
        setAvatarUrl(null);
      });
  }, [user?.id]);

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_KEY, String(next));
      return next;
    });
  };

  const navClass = (active: boolean) =>
    `flex items-center gap-3 rounded px-3 py-2 text-sm ${
      collapsed ? "justify-center" : ""
    } ${active ? "bg-[var(--admin-active)] text-[var(--admin-active-fg)]" : "hover:bg-[var(--admin-hover)]"}`;

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <div className="flex min-h-screen">
        <aside
          className={`flex shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-panel)] transition-[width] duration-200 ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--admin-border)] px-3 py-4">
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-mono text-xs text-[var(--admin-muted)]">admin.panel</p>
                <h1 className="mt-1 truncate text-lg font-semibold text-[var(--admin-accent)]">
                  {user?.username ?? "Admin"}
                </h1>
              </div>
            )}
            <button
              type="button"
              title={collapsed ? "Expand sidebar" : "Minimize sidebar"}
              onClick={toggleCollapsed}
              className="grid h-8 w-8 shrink-0 place-items-center rounded hover:bg-[var(--admin-hover)]"
            >
              {collapsed ? (
                <FiChevronRight className="h-4 w-4" />
              ) : (
                <FiChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
            <Link
              href="/admin"
              title="Dashboard"
              className={navClass(pathname === "/admin")}
            >
              <FiGrid className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/admin/projects"
              title="Projects"
              className={navClass(pathname === "/admin/projects")}
            >
              <FiFolder className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Projects</span>}
            </Link>
            <Link
              href="/admin/stats"
              title="Stats"
              className={navClass(pathname === "/admin/stats")}
            >
              <FiBarChart2 className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Stats</span>}
            </Link>
            <Link
              href="/admin/experiences"
              title="Experience"
              className={navClass(pathname === "/admin/experiences")}
            >
              <FiBriefcase className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Experience</span>}
            </Link>

            <div>
              <Link
                href="/admin/skills/groups"
                title="Skills"
                onClick={() => setSkillsOpen(true)}
                className={`flex w-full items-center gap-3 rounded px-3 py-2 text-sm ${
                  collapsed ? "justify-center" : "justify-between"
                } ${
                  skillsActive
                    ? "bg-[var(--admin-active)] text-[var(--admin-active-fg)]"
                    : "hover:bg-[var(--admin-hover)]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FiCode className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>Skills</span>}
                </span>
                {!collapsed && (
                  <span
                    role="button"
                    tabIndex={0}
                    title={skillsOpen ? "Collapse" : "Expand"}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setSkillsOpen((open) => !open);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        setSkillsOpen((open) => !open);
                      }
                    }}
                    className="grid h-6 w-6 place-items-center rounded hover:bg-white/10"
                  >
                    {skillsOpen || skillsActive ? (
                      <FiChevronDown className="h-4 w-4" />
                    ) : (
                      <FiChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </Link>
              {(skillsOpen || skillsActive) && (
                <div
                  className={`mt-0.5 space-y-0.5 ${collapsed ? "" : "pl-3"}`}
                >
                  <Link
                    href="/admin/skills/groups"
                    title="Skill groups"
                    className={navClass(groupsSelected)}
                  >
                    <FiLayers className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Skill groups</span>}
                  </Link>
                  <Link
                    href="/admin/skills"
                    title="Skills"
                    className={navClass(skillsSelected)}
                  >
                    <FiStar className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Skills</span>}
                  </Link>
                </div>
              )}
            </div>

            {ADMIN_RESOURCES.map((resource) => {
              const href = `/admin/resources/${resource.key}`;
              const Icon = RESOURCE_ICONS[resource.key] ?? FiGrid;
              return (
                <Link
                  key={resource.key}
                  href={href}
                  title={resource.label}
                  className={navClass(pathname === href)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{resource.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminNavbar avatarUrl={avatarUrl} />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
