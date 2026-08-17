"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";

export type SkillGroupFormData = {
  id: string;
  userId: string;
  title: string;
  sortOrder?: number;
};

const emptyForm = {
  title: "",
  sortOrder: "",
};

export default function SkillGroupFormDrawer({
  mode,
  group,
  userId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit" | null;
  group: SkillGroupFormData | null;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && group) {
      setForm({
        title: group.title,
        sortOrder: group.sortOrder?.toString() ?? "",
      });
    } else if (mode === "create") {
      setForm(emptyForm);
    }
    setError(null);
  }, [mode, group]);

  if (!mode) return null;

  const saveGroup = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        title: form.title.trim(),
      };
      if (form.sortOrder.trim()) payload.sortOrder = Number(form.sortOrder);

      if (mode === "edit" && group) {
        await apiFetch(`/skill-groups/${group.id}`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await apiFetch("/skill-groups", {
          method: "POST",
          body: { ...payload, userId },
        });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save skill group",
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
            {mode === "create" ? "Create group" : "Edit group"}
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
          onSubmit={saveGroup}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {error && (
              <div className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
                {error}
              </div>
            )}

            <label className="block text-sm">
              <span className="mb-1 block text-[#858585]">Title *</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Frontend"
                className="w-full rounded border border-[#3c3c3c] bg-[#252526] px-3 py-2 outline-none focus:border-[#007acc]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[#858585]">Sort order</span>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: e.target.value })
                }
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
                : mode === "create"
                  ? "Create group"
                  : "Save changes"}
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
