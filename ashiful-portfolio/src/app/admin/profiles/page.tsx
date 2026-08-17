"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type Profile = {
  id: string;
  userId: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  status: string;
  avatarUrl: string;
  linkedInUrl: string;
  resumeUrl: string;
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  roles: string[];
};

const EDITABLE = [
  "name",
  "title",
  "bio",
  "location",
  "status",
  "avatarUrl",
  "linkedInUrl",
  "resumeUrl",
  "siteUrl",
  "siteTitle",
  "siteDescription",
] as const;

export default function AdminProfilesPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [rolesText, setRolesText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Profile[]>(
        `/profiles?userId=${encodeURIComponent(user.id)}`,
      );
      setProfiles(data);
      if (data[0]) {
        setSelected(data[0]);
        const next: Record<string, string> = {};
        for (const key of EDITABLE) next[key] = String(data[0][key] ?? "");
        setForm(next);
        setRolesText(data[0].roles?.join(", ") ?? "");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        roles: rolesText
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
      };
      await apiFetch(`/profiles/${selected.id}`, {
        method: "PATCH",
        body: payload,
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[var(--admin-muted)]">Loading profiles...</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--admin-accent)]">Profiles</h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Update portfolio profile fields via API (create/delete disabled).
        </p>
      </div>

      {error && (
        <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
          {error}
        </div>
      )}

      {!selected ? (
        <p className="text-[var(--admin-muted)]">No profile found for this user.</p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="grid gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4 md:grid-cols-2"
        >
          {EDITABLE.map((key) => (
            <label
              key={key}
              className={`block text-sm ${key === "bio" || key === "siteDescription" ? "md:col-span-2" : ""}`}
            >
              <span className="mb-1 block text-[var(--admin-muted)]">{key}</span>
              {key === "bio" || key === "siteDescription" ? (
                <textarea
                  value={form[key] ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  rows={4}
                  className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
                />
              ) : (
                <input
                  value={form[key] ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
                />
              )}
            </label>
          ))}
          <label className="block text-sm md:col-span-2">
            <span className="mb-1 block text-[var(--admin-muted)]">
              roles (comma-separated)
            </span>
            <input
              value={rolesText}
              onChange={(e) => setRolesText(e.target.value)}
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[var(--admin-btn)] px-4 py-2 text-sm text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            <p className="mt-2 text-xs text-[var(--admin-muted)]">
              Profile id: {selected.id} · {profiles.length} profile(s)
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
