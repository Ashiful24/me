"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "./ConfirmDialog";
import ProjectDrawer from "./ProjectDrawer";
import ProjectFormDrawer, { type ProjectFormData } from "./ProjectFormDrawer";

type Project = ProjectFormData;

export default function ProjectsAdmin() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formProject, setFormProject] = useState<Project | null>(null);

  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Project[]>(
        `/projects?userId=${encodeURIComponent(user.id)}`,
      );
      setProjects(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setViewProject(null);
    setFormProject(null);
    setFormMode("create");
  };

  const openEdit = (project: Project) => {
    setViewProject(null);
    setFormProject(project);
    setFormMode("edit");
  };

  const openView = (project: Project) => {
    setFormMode(null);
    setFormProject(null);
    setViewProject(project);
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormProject(null);
  };

  const confirmDeleteProject = async () => {
    if (!deleteProject) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/projects/${deleteProject.id}`, { method: "DELETE" });
      if (viewProject?.id === deleteProject.id) setViewProject(null);
      if (formProject?.id === deleteProject.id) closeFormDrawer();
      setDeleteProject(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--admin-accent)]">Projects</h2>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-[var(--admin-btn)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--admin-btn-hover)]"
        >
          <FiPlus className="h-4 w-4" />
          Create project
        </button>
      </div>

      {error && (
        <div className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[var(--admin-border)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--admin-muted-bg)] text-[var(--admin-muted)]">
            <tr>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">File</th>
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="px-3 py-2 font-medium w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-[var(--admin-muted)]">
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-[var(--admin-muted)]">
                  No projects yet.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-t border-[var(--admin-border)]">
                  <td className="px-3 py-2">{project.title}</td>
                  <td className="max-w-xs truncate px-3 py-2 font-mono text-xs text-[var(--admin-muted)]">
                    {project.file}
                  </td>
                  <td className="px-3 py-2">{project.sortOrder ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="View tags & credentials"
                        onClick={() => openView(project)}
                        className="text-[var(--admin-accent)] hover:text-[var(--admin-icon-hover)]"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(project)}
                        className="text-[var(--admin-heading)] hover:text-[var(--admin-icon-hover)]"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => setDeleteProject(project)}
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

      <ProjectFormDrawer
        mode={formMode}
        project={formProject}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void load()}
      />

      <ProjectDrawer
        project={viewProject}
        userId={user?.id ?? ""}
        onClose={() => setViewProject(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteProject)}
        title="Delete project?"
        message={`Are you sure you want to delete "${deleteProject?.title}"? Tags and credentials linked to this project may also be removed.`}
        onConfirm={() => void confirmDeleteProject()}
        onCancel={() => setDeleteProject(null)}
        loading={deleting}
      />
    </div>
  );
}
