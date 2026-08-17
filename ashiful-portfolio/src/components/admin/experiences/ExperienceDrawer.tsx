"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import ConfirmDialog from "../projects/ConfirmDialog";
import FormModal from "../projects/FormModal";

type Experience = {
  id: string;
  title: string;
};

type Highlight = {
  id: string;
  text: string;
  experienceId: string;
  sortOrder?: number;
};

type HighlightFormState = {
  mode: "create" | "edit";
  id?: string;
  text: string;
};

export default function ExperienceDrawer({
  experience,
  userId,
  onClose,
}: {
  experience: Experience | null;
  userId: string;
  onClose: () => void;
}) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [highlightForm, setHighlightForm] = useState<HighlightFormState | null>(
    null,
  );
  const [modalError, setModalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Highlight | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!experience) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Highlight[]>(
        `/experience-highlights?experienceId=${encodeURIComponent(experience.id)}`,
      );
      setHighlights(data);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to load experience highlights",
      );
    } finally {
      setLoading(false);
    }
  }, [experience]);

  useEffect(() => {
    if (experience) void load();
    else {
      setHighlights([]);
      setHighlightForm(null);
      setModalError(null);
    }
  }, [experience, load]);

  const closeHighlightModal = () => {
    setHighlightForm(null);
    setModalError(null);
  };

  const saveHighlight = async (e: FormEvent) => {
    e.preventDefault();
    if (!experience || !highlightForm?.text.trim()) return;
    setSaving(true);
    setModalError(null);
    try {
      if (highlightForm.mode === "edit" && highlightForm.id) {
        await apiFetch(`/experience-highlights/${highlightForm.id}`, {
          method: "PATCH",
          body: { text: highlightForm.text.trim() },
        });
      } else {
        await apiFetch("/experience-highlights", {
          method: "POST",
          body: {
            userId,
            experienceId: experience.id,
            text: highlightForm.text.trim(),
          },
        });
      }
      closeHighlightModal();
      await load();
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : "Failed to save highlight",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/experience-highlights/${deleteTarget.id}`, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (!experience) return null;

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
            {experience.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[var(--admin-hover)]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="mb-4 rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-[var(--admin-muted)]">Loading highlights...</p>
          ) : (
            <section>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-medium text-[var(--admin-heading)]">Highlights</h3>
                <button
                  type="button"
                  onClick={() => {
                    setModalError(null);
                    setHighlightForm({ mode: "create", text: "" });
                  }}
                  className="flex items-center gap-1 rounded bg-[var(--admin-btn)] px-3 py-1.5 text-xs text-white hover:bg-[var(--admin-btn-hover)]"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                  Create highlight
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-[var(--admin-border)]">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[var(--admin-muted-bg)] text-[var(--admin-muted)]">
                    <tr>
                      <th className="px-3 py-2 font-medium">Text</th>
                      <th className="w-24 px-3 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highlights.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-3 py-4 text-[var(--admin-muted)]">
                          No highlights yet.
                        </td>
                      </tr>
                    ) : (
                      highlights.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[var(--admin-border)]"
                        >
                          <td className="px-3 py-2">{item.text}</td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                title="Edit"
                                onClick={() => {
                                  setModalError(null);
                                  setHighlightForm({
                                    mode: "edit",
                                    id: item.id,
                                    text: item.text,
                                  });
                                }}
                                className="text-[var(--admin-accent)] hover:text-[var(--admin-icon-hover)]"
                              >
                                <FiEdit2 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Delete"
                                onClick={() => setDeleteTarget(item)}
                                className="text-[var(--admin-danger)] hover:text-[var(--admin-danger-hover)]"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </aside>

      <FormModal
        open={Boolean(highlightForm)}
        title={
          highlightForm?.mode === "edit"
            ? "Edit highlight"
            : "Create highlight"
        }
        onClose={closeHighlightModal}
      >
        <form onSubmit={saveHighlight} className="space-y-4">
          {modalError && highlightForm && (
            <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {modalError}
            </div>
          )}
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Highlight *</span>
            <textarea
              value={highlightForm?.text ?? ""}
              onChange={(e) =>
                highlightForm &&
                setHighlightForm({ ...highlightForm, text: e.target.value })
              }
              placeholder="Built REST APIs with NestJS..."
              required
              autoFocus
              rows={4}
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeHighlightModal}
              disabled={saving}
              className="rounded bg-[var(--admin-secondary)] px-4 py-2 text-sm hover:bg-[var(--admin-hover-strong)] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[var(--admin-btn)] px-4 py-2 text-sm text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : highlightForm?.mode === "edit"
                  ? "Save changes"
                  : "Create highlight"}
            </button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete highlight?"
        message={`Are you sure you want to delete this highlight? This cannot be undone.`}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
