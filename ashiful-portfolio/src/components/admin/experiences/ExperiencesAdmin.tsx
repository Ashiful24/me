"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "../projects/ConfirmDialog";
import ExperienceDrawer from "./ExperienceDrawer";
import ExperienceFormDrawer, {
  type ExperienceFormData,
} from "./ExperienceFormDrawer";

type Experience = ExperienceFormData;

export default function ExperiencesAdmin() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formExperience, setFormExperience] = useState<Experience | null>(null);

  const [viewExperience, setViewExperience] = useState<Experience | null>(null);
  const [deleteExperience, setDeleteExperience] = useState<Experience | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Experience[]>(
        `/experiences?userId=${encodeURIComponent(user.id)}`,
      );
      setExperiences(data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load experiences",
      );
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setViewExperience(null);
    setFormExperience(null);
    setFormMode("create");
  };

  const openEdit = (experience: Experience) => {
    setViewExperience(null);
    setFormExperience(experience);
    setFormMode("edit");
  };

  const openView = (experience: Experience) => {
    setFormMode(null);
    setFormExperience(null);
    setViewExperience(experience);
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormExperience(null);
  };

  const confirmDeleteExperience = async () => {
    if (!deleteExperience) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/experiences/${deleteExperience.id}`, {
        method: "DELETE",
      });
      if (viewExperience?.id === deleteExperience.id) setViewExperience(null);
      if (formExperience?.id === deleteExperience.id) closeFormDrawer();
      setDeleteExperience(null);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete experience",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[#9cdcfe]">Experience</h2>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb]"
        >
          <FiPlus className="h-4 w-4" />
          Create experience
        </button>
      </div>

      {error && (
        <div className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#3c3c3c]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#2d2d30] text-[#858585]">
            <tr>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Subtitle</th>
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="w-32 px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-[#858585]">
                  Loading...
                </td>
              </tr>
            ) : experiences.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-[#858585]">
                  No experiences yet.
                </td>
              </tr>
            ) : (
              experiences.map((experience) => (
                <tr key={experience.id} className="border-t border-[#3c3c3c]">
                  <td className="px-3 py-2">{experience.title}</td>
                  <td className="max-w-xs truncate px-3 py-2 text-[#858585]">
                    {experience.subtitle}
                  </td>
                  <td className="px-3 py-2">{experience.sortOrder ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="View highlights"
                        onClick={() => openView(experience)}
                        className="text-[#9cdcfe] hover:text-white"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(experience)}
                        className="text-[#dcdcaa] hover:text-white"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => setDeleteExperience(experience)}
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

      <ExperienceFormDrawer
        mode={formMode}
        experience={formExperience}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void load()}
      />

      <ExperienceDrawer
        experience={viewExperience}
        userId={user?.id ?? ""}
        onClose={() => setViewExperience(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteExperience)}
        title="Delete experience?"
        message={`Are you sure you want to delete "${deleteExperience?.title}"? Highlights linked to this experience may also be removed.`}
        onConfirm={() => void confirmDeleteExperience()}
        onCancel={() => setDeleteExperience(null)}
        loading={deleting}
      />
    </div>
  );
}
