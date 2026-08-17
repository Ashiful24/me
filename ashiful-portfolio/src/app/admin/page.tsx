"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_RESOURCES } from "@/lib/admin-resources";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#9cdcfe]">Dashboard</h2>
        <p className="mt-1 text-sm text-[#858585]">
          Logged in as <span className="text-[#ce9178]">{user?.username}</span>{" "}
          ({user?.email}). Access and refresh tokens are stored in this browser.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/projects"
          className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
        >
          <h3 className="font-medium text-[#dcdcaa]">Projects</h3>
        </Link>
        <Link
          href="/admin/stats"
          className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
        >
          <h3 className="font-medium text-[#dcdcaa]">Stats</h3>
        </Link>
        <Link
          href="/admin/experiences"
          className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
        >
          <h3 className="font-medium text-[#dcdcaa]">Experience</h3>
        </Link>
        <Link
          href="/admin/skills/groups"
          className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
        >
          <h3 className="font-medium text-[#dcdcaa]">Skill groups</h3>
        </Link>
        <Link
          href="/admin/skills"
          className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
        >
          <h3 className="font-medium text-[#dcdcaa]">Skills</h3>
        </Link>
        {ADMIN_RESOURCES.map((resource) => (
          <Link
            key={resource.key}
            href={`/admin/resources/${resource.key}`}
            className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-4 transition hover:border-[#007acc]"
          >
            <h3 className="font-medium text-[#dcdcaa]">{resource.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
