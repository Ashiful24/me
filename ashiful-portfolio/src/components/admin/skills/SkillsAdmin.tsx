"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "../projects/ConfirmDialog";
import SkillDetailDrawer from "./SkillDetailDrawer";
import SkillFormDrawer, {
  type SkillFormData,
  type SkillGroupOption,
} from "./SkillFormDrawer";

type Skill = SkillFormData;

export default function SkillsAdmin() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [groups, setGroups] = useState<SkillGroupOption[]>([]);
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formSkill, setFormSkill] = useState<Skill | null>(null);
  const [detailSkill, setDetailSkill] = useState<Skill | null>(null);

  const [deleteSkill, setDeleteSkill] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadGroups = useCallback(async () => {
    if (!user?.id) return;
    try {
      const groupData = await apiFetch<SkillGroupOption[]>(
        `/skill-groups?userId=${encodeURIComponent(user.id)}`,
      );
      setGroups(groupData);
    } catch {
      setGroups([]);
    }
  }, [user?.id]);

  const loadSkills = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ userId: user.id });
      if (groupId) params.set("groupId", groupId);
      const skillData = await apiFetch<Skill[]>(`/skills?${params.toString()}`);
      setSkills(skillData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load skills");
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, groupId]);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    void loadSkills();
  }, [loadSkills]);

  const reload = async () => {
    await Promise.all([loadGroups(), loadSkills()]);
  };

  const openCreate = () => {
    setDetailSkill(null);
    setFormSkill(null);
    setFormMode("create");
  };

  const openEdit = (skill: Skill) => {
    setDetailSkill(null);
    setFormSkill(skill);
    setFormMode("edit");
  };

  const openDetails = (skill: Skill) => {
    setFormMode(null);
    setFormSkill(null);
    setDetailSkill(skill);
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormSkill(null);
  };

  const confirmDeleteSkill = async () => {
    if (!deleteSkill) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/skills/${deleteSkill.id}`, { method: "DELETE" });
      if (detailSkill?.id === deleteSkill.id) setDetailSkill(null);
      if (formSkill?.id === deleteSkill.id) closeFormDrawer();
      setDeleteSkill(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete skill");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[#9cdcfe]">Skills</h2>
          <button
            type="button"
            onClick={openCreate}
            disabled={groups.length === 0}
            className="flex items-center gap-2 rounded bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb] disabled:opacity-60"
          >
            <FiPlus className="h-4 w-4" />
            Create skill
          </button>
        </div>
        <div className="flex justify-start">
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="rounded border border-[#3c3c3c] bg-[#252526] px-3 py-2 text-sm outline-none focus:border-[#007acc]"
          >
            <option value="">All groups</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {groups.length === 0 && !loading && (
        <p className="text-sm text-[#858585]">
          Create a skill group first, then add skills.
        </p>
      )}

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
              <th className="px-3 py-2 font-medium">Group</th>
              <th className="px-3 py-2 font-medium">Icon</th>
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="w-32 px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-[#858585]">
                  Loading...
                </td>
              </tr>
            ) : skills.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-[#858585]">
                  No skills yet.
                </td>
              </tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill.id} className="border-t border-[#3c3c3c]">
                  <td className="px-3 py-2">{skill.title}</td>
                  <td className="px-3 py-2 text-[#858585]">
                    {skill.parent?.title ?? "—"}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-[#858585]">
                    {skill.iconKey}
                  </td>
                  <td className="px-3 py-2">{skill.sortOrder ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="Details"
                        onClick={() => openDetails(skill)}
                        className="text-[#9cdcfe] hover:text-white"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(skill)}
                        className="text-[#dcdcaa] hover:text-white"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => setDeleteSkill(skill)}
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

      <SkillFormDrawer
        key={`${formMode ?? "closed"}-${formSkill?.id ?? "new"}`}
        mode={formMode}
        skill={formSkill}
        groups={groups}
        defaultGroupId={groupId}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void reload()}
      />

      <SkillDetailDrawer
        skill={detailSkill}
        userId={user?.id ?? ""}
        onClose={() => setDetailSkill(null)}
        onSaved={() => void reload()}
      />

      <ConfirmDialog
        open={Boolean(deleteSkill)}
        title="Delete skill?"
        message={`Are you sure you want to delete "${deleteSkill?.title}"? Skill details may also be removed.`}
        onConfirm={() => void confirmDeleteSkill()}
        onCancel={() => setDeleteSkill(null)}
        loading={deleting}
      />
    </div>
  );
}
