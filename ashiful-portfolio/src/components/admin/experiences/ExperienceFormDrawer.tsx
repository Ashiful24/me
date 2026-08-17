"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";

export type ExperienceFormData = {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  sortOrder?: number;
};

const emptyForm = {
  title: "",
  subtitle: "",
  sortOrder: "",
};

export default function ExperienceFormDrawer({
  mode,
  experience,
  userId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit" | null;
  experience: ExperienceFormData | null;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && experience) {
      setForm({
        title: experience.title,
        subtitle: experience.subtitle,
        sortOrder: experience.sortOrder?.toString() ?? "",
      });
    } else if (mode === "create") {
      setForm(emptyForm);
    }
    setError(null);
  }, [mode, experience]);

  if (!mode) return null;

  const saveExperience = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
      };
      if (form.sortOrder.trim()) payload.sortOrder = Number(form.sortOrder);

      if (mode === "edit" && experience) {
        await apiFetch(`/experiences/${experience.id}`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await apiFetch("/experiences", {
          method: "POST",
          body: { ...payload, userId },
        });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save experience",
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
            {mode === "create" ? "Create experience" : "Edit experience"}
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
          onSubmit={saveExperience}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {error && (
              <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
                {error}
              </div>
            )}

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Title *</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Junior Software Engineer"
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Subtitle *</span>
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                required
                placeholder="BMQS · 2024 — Present"
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Sort order</span>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: e.target.value })
                }
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
                : mode === "create"
                  ? "Create experience"
                  : "Save changes"}
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
