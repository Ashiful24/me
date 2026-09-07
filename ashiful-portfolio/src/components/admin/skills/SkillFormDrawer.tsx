"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";

export type SkillGroupOption = {
  id: string;
  title: string;
};

export type SkillDetailData = {
  id: string;
  knowledge: string;
  experience: string;
  stats: string;
} | null;

export type SkillFormData = {
  id: string;
  userId: string;
  parentId: string;
  title: string;
  iconKey: string;
  color: string;
  sortOrder?: number;
  parent?: SkillGroupOption | null;
  detail?: SkillDetailData;
};

const emptyForm = {
  parentId: "",
  title: "",
  sortOrder: "",
};

const selectClass =
  "w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]";

export default function SkillFormDrawer({
  mode,
  skill,
  groups,
  defaultGroupId,
  userId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit" | null;
  skill: SkillFormData | null;
  groups: SkillGroupOption[];
  defaultGroupId?: string;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const fallbackGroupId = groups[0]?.id ?? "";
  const createGroupId = defaultGroupId || fallbackGroupId;
  const skillId = skill?.id ?? "";

  useEffect(() => {
    if (mode === "edit" && skill) {
      setForm({
        parentId: skill.parentId,
        title: skill.title,
        sortOrder: skill.sortOrder?.toString() ?? "",
      });
    } else if (mode === "create") {
      setForm({
        ...emptyForm,
        parentId: createGroupId,
      });
    }
  }, [mode, skill, skillId, createGroupId]);

  if (!mode) return null;

  const saveSkill = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId || !form.parentId) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        parentId: form.parentId,
        title: form.title.trim(),
        sortOrder: Number(form.sortOrder),
      };

      if (mode === "edit" && skill) {
        await apiFetch(`/skills/${skill.id}`, {
          method: "PATCH",
          body: payload,
        });
        toast.success("Skill updated.");
      } else {
        await apiFetch("/skills", {
          method: "POST",
          body: { ...payload, userId },
        });
        toast.success("Skill created.");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save skill");
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
            {mode === "create" ? "Create skill" : "Edit skill"}
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
          onSubmit={saveSkill}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">
                Skill group *
              </span>
              <select
                value={form.parentId}
                onChange={(e) =>
                  setForm({ ...form, parentId: e.target.value })
                }
                required
                className={selectClass}
              >
                <option value="" disabled>
                  Select a group
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">Title *</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="TypeScript"
                className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              />
              <p className="mt-1 text-xs text-[var(--admin-muted)]">
                Icon is auto-selected from the title. Color uses the default
                theme accent.
              </p>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-[var(--admin-muted)]">
                Sort order *
              </span>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: e.target.value })
                }
                required
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
                  ? "Create skill"
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
