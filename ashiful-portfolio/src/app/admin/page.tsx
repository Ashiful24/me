"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_RESOURCES } from "@/lib/admin-resources";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--admin-accent)]">Dashboard</h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Logged in as <span className="text-[var(--admin-string)]">{user?.username}</span>{" "}
          ({user?.email}). Access and refresh tokens are stored in this browser.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/projects"
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
        >
          <h3 className="font-medium text-[var(--admin-heading)]">Projects</h3>
        </Link>
        <Link
          href="/admin/stats"
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
        >
          <h3 className="font-medium text-[var(--admin-heading)]">Stats</h3>
        </Link>
        <Link
          href="/admin/experiences"
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
        >
          <h3 className="font-medium text-[var(--admin-heading)]">Experience</h3>
        </Link>
        <Link
          href="/admin/skills/groups"
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
        >
          <h3 className="font-medium text-[var(--admin-heading)]">Skill groups</h3>
        </Link>
        <Link
          href="/admin/skills"
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
        >
          <h3 className="font-medium text-[var(--admin-heading)]">Skills</h3>
        </Link>
        {ADMIN_RESOURCES.map((resource) => (
          <Link
            key={resource.key}
            href={`/admin/resources/${resource.key}`}
            className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 transition hover:border-[var(--admin-focus)]"
          >
            <h3 className="font-medium text-[var(--admin-heading)]">{resource.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
