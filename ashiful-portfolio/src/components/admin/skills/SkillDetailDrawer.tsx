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
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#3c3c3c] bg-[#252526] px-4 py-3">
          <h2 className="min-w-0 truncate text-lg font-semibold text-[#9cdcfe]">
            {skill.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[#2a2d2e]"
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
              <div className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
                {error}
              </div>
            )}

            <label className="block text-sm">
              <span className="mb-1 block text-[#858585]">Knowledge *</span>
              <textarea
                value={form.knowledge}
                onChange={(e) =>
                  setForm({ ...form, knowledge: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-3 py-2 outline-none focus:border-[#007acc]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#858585]">Experience *</span>
              <textarea
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-3 py-2 outline-none focus:border-[#007acc]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#858585]">Stats *</span>
              <textarea
                value={form.stats}
                onChange={(e) => setForm({ ...form, stats: e.target.value })}
                required
                rows={3}
                className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-3 py-2 outline-none focus:border-[#007acc]"
              />
            </label>
          </div>

          <div className="flex gap-2 border-t border-[#3c3c3c] bg-[#252526] p-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded bg-[#0e639c] py-2.5 text-sm font-medium text-white hover:bg-[#1177bb] disabled:opacity-60"
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
              className="rounded bg-[#3c3c3c] px-5 py-2.5 text-sm hover:bg-[#4e4e4e] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
