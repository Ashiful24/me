"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import type { SkillFormData } from "./SkillFormDrawer";

type DetailForm = {
  knowledge: string;
  experience: string;
  stats: string;
};

const emptyDetail: DetailForm = {
  knowledge: "",
  experience: "",
  stats: "",
};

export default function SkillDetailDrawer({
  skill,
  userId,
  onClose,
  onSaved,
}: {
  skill: SkillFormData | null;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(emptyDetail);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skill?.detail) {
      setForm({
        knowledge: skill.detail.knowledge,
        experience: skill.detail.experience,
        stats: skill.detail.stats,
      });
    } else {
      setForm(emptyDetail);
    }
    setError(null);
  }, [skill]);

  if (!skill) return null;

  const hasDetail = Boolean(skill.detail);

  const saveDetail = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        knowledge: form.knowledge.trim(),
        experience: form.experience.trim(),
        stats: form.stats.trim(),
      };

      if (hasDetail && skill.detail) {
        await apiFetch(`/skill-details/${skill.detail.id}`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await apiFetch("/skill-details", {
          method: "POST",
          body: { ...payload, userId, skillId: skill.id },
        });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save skill details",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[var(--admin-overlay)]"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[var(--admin-border)] bg-[var(--admin-bg)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3">
          <h2 className="min-w-0 truncate text-lg font-semibold text-[var(--admin-accent)]">
            {skill.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[var(--admin-hover)]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={saveDetail}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {error && (
              <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
                {error}
              </div>
            )}

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Knowledge *</span>
              <textarea
                value={form.knowledge}
                onChange={(e) =>
                  setForm({ ...form, knowledge: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Experience *</span>
              <textarea
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Stats *</span>
              <textarea
                value={form.stats}
                onChange={(e) => setForm({ ...form, stats: e.target.value })}
                required
                rows={3}
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
            </label>
          </div>

          <div className="flex gap-2 border-t border-[var(--admin-border)] bg-[var(--admin-panel)] p-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded bg-[var(--admin-btn)] py-2.5 text-sm font-medium text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : hasDetail
                  ? "Save changes"
                  : "Create details"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded bg-[var(--admin-secondary)] px-5 py-2.5 text-sm hover:bg-[var(--admin-hover-strong)] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
