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
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#3c3c3c] bg-[#252526] px-4 py-3">
          <h2 className="min-w-0 truncate text-lg font-semibold text-[#9cdcfe]">
            {experience.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[#2a2d2e]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="mb-4 rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-[#858585]">Loading highlights...</p>
          ) : (
            <section>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-medium text-[#dcdcaa]">Highlights</h3>
                <button
                  type="button"
                  onClick={() => {
                    setModalError(null);
                    setHighlightForm({ mode: "create", text: "" });
                  }}
                  className="flex items-center gap-1 rounded bg-[#0e639c] px-3 py-1.5 text-xs text-white hover:bg-[#1177bb]"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                  Create highlight
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-[#3c3c3c]">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#2d2d30] text-[#858585]">
                    <tr>
                      <th className="px-3 py-2 font-medium">Text</th>
                      <th className="w-24 px-3 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highlights.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-3 py-4 text-[#858585]">
                          No highlights yet.
                        </td>
                      </tr>
                    ) : (
                      highlights.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[#3c3c3c]"
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
                                className="text-[#9cdcfe] hover:text-white"
                              >
                                <FiEdit2 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                title="Delete"
                                onClick={() => setDeleteTarget(item)}
                                className="text-[#f14c4c] hover:text-[#ff6b6b]"
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
            <div className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
              {modalError}
            </div>
          )}
          <label className="block text-sm">
            <span className="mb-1 block text-[#858585]">Highlight *</span>
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
              className="w-full rounded border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 outline-none focus:border-[#007acc]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeHighlightModal}
              disabled={saving}
              className="rounded bg-[#3c3c3c] px-4 py-2 text-sm hover:bg-[#4e4e4e] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[#0e639c] px-4 py-2 text-sm text-white hover:bg-[#1177bb] disabled:opacity-60"
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
