"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "../projects/ConfirmDialog";
import StatFormDrawer, { type StatFormData } from "./StatFormDrawer";

type Stat = StatFormData;

export default function StatsAdmin() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formStat, setFormStat] = useState<Stat | null>(null);

  const [deleteStat, setDeleteStat] = useState<Stat | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Stat[]>(
        `/stats?userId=${encodeURIComponent(user.id)}`,
      );
      setStats(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load stats");
      setStats([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setFormStat(null);
    setFormMode("create");
  };

  const openEdit = (stat: Stat) => {
    setFormStat(stat);
    setFormMode("edit");
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormStat(null);
  };

  const confirmDeleteStat = async () => {
    if (!deleteStat) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`/stats/${deleteStat.id}`, { method: "DELETE" });
      if (formStat?.id === deleteStat.id) closeFormDrawer();
      setDeleteStat(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete stat");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[#9cdcfe]">Stats</h2>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb]"
        >
          <FiPlus className="h-4 w-4" />
          Create stat
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
              <th className="px-3 py-2 font-medium">Value</th>
              <th className="px-3 py-2 font-medium">Label</th>
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
            ) : stats.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-[#858585]">
                  No stats yet.
                </td>
              </tr>
            ) : (
              stats.map((stat) => (
                <tr key={stat.id} className="border-t border-[#3c3c3c]">
                  <td className="px-3 py-2">{stat.value}</td>
                  <td className="px-3 py-2">{stat.label}</td>
                  <td className="px-3 py-2">{stat.sortOrder ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(stat)}
                        className="text-[#dcdcaa] hover:text-white"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => setDeleteStat(stat)}
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

      <StatFormDrawer
        mode={formMode}
        stat={formStat}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void load()}
      />

      <ConfirmDialog
        open={Boolean(deleteStat)}
        title="Delete stat?"
        message={`Are you sure you want to delete "${deleteStat?.label}"? This cannot be undone.`}
        onConfirm={() => void confirmDeleteStat()}
        onCancel={() => setDeleteStat(null)}
        loading={deleting}
      />
    </div>
  );
}
