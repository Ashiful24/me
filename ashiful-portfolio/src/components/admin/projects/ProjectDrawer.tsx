"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import ConfirmDialog from "./ConfirmDialog";
import FormModal from "./FormModal";

type Project = {
  id: string;
  title: string;
  file: string;
};

type Tag = { id: string; name: string; projectId: string };
type Credential = { id: string; label: string; value: string; projectId: string };

type TagFormState = { mode: "create" | "edit"; id?: string; name: string };
type CredFormState = {
  mode: "create" | "edit";
  id?: string;
  label: string;
  value: string;
};

export default function ProjectDrawer({
  project,
  userId,
  onClose,
}: {
  project: Project | null;
  userId: string;
  onClose: () => void;
}) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tagForm, setTagForm] = useState<TagFormState | null>(null);
  const [credForm, setCredForm] = useState<CredFormState | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "tag" | "credential";
    id: string;
    label: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!project) return;
    setLoading(true);
    setError(null);
    try {
      const [tagData, credData] = await Promise.all([
        apiFetch<Tag[]>(
          `/project-tags?projectId=${encodeURIComponent(project.id)}`,
        ),
        apiFetch<Credential[]>(
          `/project-credentials?projectId=${encodeURIComponent(project.id)}`,
        ),
      ]);
      setTags(tagData);
      setCredentials(credData);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load project details",
      );
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    if (project) void load();
    else {
      setTags([]);
      setCredentials([]);
      setTagForm(null);
      setCredForm(null);
      setModalError(null);
    }
  }, [project, load]);

  const closeTagModal = () => {
    setTagForm(null);
    setModalError(null);
  };

  const closeCredModal = () => {
    setCredForm(null);
    setModalError(null);
  };

  const saveTag = async (e: FormEvent) => {
    e.preventDefault();
    if (!project || !tagForm?.name.trim()) return;
    setSaving(true);
    setModalError(null);
    try {
      if (tagForm.mode === "edit" && tagForm.id) {
        await apiFetch(`/project-tags/${tagForm.id}`, {
          method: "PATCH",
          body: { name: tagForm.name.trim() },
        });
      } else {
        await apiFetch("/project-tags", {
          method: "POST",
          body: {
            userId,
            projectId: project.id,
            name: tagForm.name.trim(),
          },
        });
      }
      closeTagModal();
      await load();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Failed to save tag");
    } finally {
      setSaving(false);
    }
  };

  const saveCredential = async (e: FormEvent) => {
    e.preventDefault();
    if (!project || !credForm?.label.trim() || !credForm.value.trim()) return;
    setSaving(true);
    setModalError(null);
    try {
      if (credForm.mode === "edit" && credForm.id) {
        await apiFetch(`/project-credentials/${credForm.id}`, {
          method: "PATCH",
          body: {
            label: credForm.label.trim(),
            value: credForm.value.trim(),
          },
        });
      } else {
        await apiFetch("/project-credentials", {
          method: "POST",
          body: {
            userId,
            projectId: project.id,
            label: credForm.label.trim(),
            value: credForm.value.trim(),
          },
        });
      }
      closeCredModal();
      await load();
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : "Failed to save credential",
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
      const path =
        deleteTarget.type === "tag"
          ? `/project-tags/${deleteTarget.id}`
          : `/project-credentials/${deleteTarget.id}`;
      await apiFetch(path, { method: "DELETE" });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (!project) return null;

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
            {project.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[var(--admin-hover)]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-4">
          {error && (
            <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-[var(--admin-muted)]">
              Loading tags & credentials...
            </p>
          ) : (
            <>
              <section>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-medium text-[var(--admin-heading)]">Tags</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setModalError(null);
                      setTagForm({ mode: "create", name: "" });
                    }}
                    className="flex items-center gap-1 rounded bg-[var(--admin-btn)] px-3 py-1.5 text-xs text-white hover:bg-[var(--admin-btn-hover)]"
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                    Create tag
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-[var(--admin-border)]">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-[var(--admin-muted-bg)] text-[var(--admin-muted)]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Name</th>
                        <th className="w-24 px-3 py-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-3 py-4 text-[var(--admin-muted)]">
                            No tags yet.
                          </td>
                        </tr>
                      ) : (
                        tags.map((tag) => (
                          <tr key={tag.id} className="border-t border-[var(--admin-border)]">
                            <td className="px-3 py-2">{tag.name}</td>
                            <td className="px-3 py-2">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  title="Edit"
                                  onClick={() => {
                                    setModalError(null);
                                    setTagForm({
                                      mode: "edit",
                                      id: tag.id,
                                      name: tag.name,
                                    });
                                  }}
                                  className="text-[var(--admin-accent)] hover:text-[var(--admin-icon-hover)]"
                                >
                                  <FiEdit2 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  title="Delete"
                                  onClick={() =>
                                    setDeleteTarget({
                                      type: "tag",
                                      id: tag.id,
                                      label: tag.name,
                                    })
                                  }
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

              <section>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-medium text-[var(--admin-heading)]">Credentials</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setModalError(null);
                      setCredForm({ mode: "create", label: "", value: "" });
                    }}
                    className="flex items-center gap-1 rounded bg-[var(--admin-btn)] px-3 py-1.5 text-xs text-white hover:bg-[var(--admin-btn-hover)]"
                  >
                    <FiPlus className="h-3.5 w-3.5" />
                    Create credential
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-[var(--admin-border)]">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-[var(--admin-muted-bg)] text-[var(--admin-muted)]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Label</th>
                        <th className="px-3 py-2 font-medium">Value</th>
                        <th className="w-24 px-3 py-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {credentials.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-3 py-4 text-[var(--admin-muted)]">
                            No credentials yet.
                          </td>
                        </tr>
                      ) : (
                        credentials.map((cred) => (
                          <tr
                            key={cred.id}
                            className="border-t border-[var(--admin-border)]"
                          >
                            <td className="px-3 py-2">{cred.label}</td>
                            <td className="max-w-[140px] truncate px-3 py-2 font-mono text-xs text-[var(--admin-string)]">
                              {cred.value}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  title="Edit"
                                  onClick={() => {
                                    setModalError(null);
                                    setCredForm({
                                      mode: "edit",
                                      id: cred.id,
                                      label: cred.label,
                                      value: cred.value,
                                    });
                                  }}
                                  className="text-[var(--admin-accent)] hover:text-[var(--admin-icon-hover)]"
                                >
                                  <FiEdit2 className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  title="Delete"
                                  onClick={() =>
                                    setDeleteTarget({
                                      type: "credential",
                                      id: cred.id,
                                      label: cred.label,
                                    })
                                  }
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
            </>
          )}
        </div>
      </aside>

      <FormModal
        open={Boolean(tagForm)}
        title={tagForm?.mode === "edit" ? "Edit tag" : "Create tag"}
        subtitle={project.title}
        onClose={closeTagModal}
      >
        <form onSubmit={saveTag} className="space-y-4">
          {modalError && tagForm && (
            <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {modalError}
            </div>
          )}
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Tag name *</span>
            <input
              value={tagForm?.name ?? ""}
              onChange={(e) =>
                tagForm &&
                setTagForm({ ...tagForm, name: e.target.value })
              }
              placeholder="e.g. NestJS"
              required
              autoFocus
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeTagModal}
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
                : tagForm?.mode === "edit"
                  ? "Save changes"
                  : "Create tag"}
            </button>
          </div>
        </form>
      </FormModal>

      <FormModal
        open={Boolean(credForm)}
        title={
          credForm?.mode === "edit" ? "Edit credential" : "Create credential"
        }
        subtitle={project.title}
        onClose={closeCredModal}
      >
        <form onSubmit={saveCredential} className="space-y-4">
          {modalError && credForm && (
            <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {modalError}
            </div>
          )}
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Label *</span>
            <input
              value={credForm?.label ?? ""}
              onChange={(e) =>
                credForm &&
                setCredForm({ ...credForm, label: e.target.value })
              }
              placeholder="e.g. Username"
              required
              autoFocus
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Value *</span>
            <input
              value={credForm?.value ?? ""}
              onChange={(e) =>
                credForm &&
                setCredForm({ ...credForm, value: e.target.value })
              }
              placeholder="e.g. demo@example.com"
              required
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeCredModal}
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
                : credForm?.mode === "edit"
                  ? "Save changes"
                  : "Create credential"}
            </button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete ${deleteTarget?.type === "tag" ? "tag" : "credential"}?`}
        message={`Are you sure you want to delete "${deleteTarget?.label}"? This cannot be undone.`}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
}
