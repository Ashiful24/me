"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "../projects/ConfirmDialog";
import SkillGroupFormDrawer, {
  type SkillGroupFormData,
} from "./SkillGroupFormDrawer";

type SkillGroup = SkillGroupFormData;

export default function SkillGroupsAdmin() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formGroup, setFormGroup] = useState<SkillGroup | null>(null);

  const [deleteGroup, setDeleteGroup] = useState<SkillGroup | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<SkillGroup[]>(
        `/skill-groups?userId=${encodeURIComponent(user.id)}`,
      );
      setGroups(data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Failed to load skill groups",
      );
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setFormGroup(null);
    setFormMode("create");
  };

  const openEdit = (group: SkillGroup) => {
    setFormGroup(group);
    setFormMode("edit");
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormGroup(null);
  };

  const confirmDeleteGroup = async () => {
    if (!deleteGroup) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/skill-groups/${deleteGroup.id}`, { method: "DELETE" });
      if (formGroup?.id === deleteGroup.id) closeFormDrawer();
      setDeleteGroup(null);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete skill group",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[#9cdcfe]">Skill groups</h2>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb]"
        >
          <FiPlus className="h-4 w-4" />
          Create group
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
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="w-32 px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-[#858585]">
                  Loading...
                </td>
              </tr>
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-[#858585]">
                  No skill groups yet.
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.id} className="border-t border-[#3c3c3c]">
                  <td className="px-3 py-2">{group.title}</td>
                  <td className="px-3 py-2">{group.sortOrder ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(group)}
                        className="text-[#dcdcaa] hover:text-white"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => setDeleteGroup(group)}
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

      <SkillGroupFormDrawer
        mode={formMode}
        group={formGroup}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void load()}
      />

      <ConfirmDialog
        open={Boolean(deleteGroup)}
        title="Delete skill group?"
        message={`Are you sure you want to delete "${deleteGroup?.title}"? Skills in this group may also be removed.`}
        onConfirm={() => void confirmDeleteGroup()}
        onCancel={() => setDeleteGroup(null)}
        loading={deleting}
      />
    </div>
  );
}
