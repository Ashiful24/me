"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { ResourceConfig } from "@/lib/admin-resources";
import ConfirmDialog from "./projects/ConfirmDialog";
import ResourceFormDrawer from "./ResourceFormDrawer";

type Row = Record<string, unknown> & { id: string };

function cellValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function ResourceCrud({ config }: { config: ResourceConfig }) {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [formRow, setFormRow] = useState<Row | null>(null);
  const [deleteRow, setDeleteRow] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  const canCreate = config.canCreate !== false;
  const canDelete = config.canDelete !== false;

  const load = useCallback(async () => {
    if (!user?.id && config.listQuery) return;
    setLoading(true);
    setError(null);
    try {
      const query = config.listQuery?.(user!.id) ?? "";
      const data = await apiFetch<Row[]>(`${config.path}${query}`);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [config, user]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setFormRow(null);
    setFormMode("create");
  };

  const openEdit = (row: Row) => {
    setFormRow(row);
    setFormMode("edit");
  };

  const closeFormDrawer = () => {
    setFormMode(null);
    setFormRow(null);
  };

  const confirmDelete = async () => {
    if (!deleteRow) return;
    setDeleting(true);
    setError(null);
    try {
      await apiFetch(`${config.path}/${deleteRow.id}`, { method: "DELETE" });
      if (formRow?.id === deleteRow.id) closeFormDrawer();
      setDeleteRow(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const deleteLabel = deleteRow
    ? cellValue(deleteRow[config.columns[0]?.key] ?? deleteRow.id)
    : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[var(--admin-accent)]">{config.label}</h2>
        {canCreate && (
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded bg-[var(--admin-btn)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--admin-btn-hover)]"
          >
            <FiPlus className="h-4 w-4" />
            Create {config.singular}
          </button>
        )}
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
              {config.columns.map((col) => (
                <th key={col.key} className="px-3 py-2 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="w-32 px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-3 py-6 text-[var(--admin-muted)]"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-3 py-6 text-[var(--admin-muted)]"
                >
                  No records yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--admin-border)]">
                  {config.columns.map((col) => (
                    <td key={col.key} className="max-w-xs truncate px-3 py-2">
                      {cellValue(row[col.key])}
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openEdit(row)}
                        className="text-[var(--admin-heading)] hover:text-[var(--admin-icon-hover)]"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      {canDelete && (
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => setDeleteRow(row)}
                          className="text-[var(--admin-danger)] hover:text-[var(--admin-danger-hover)]"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ResourceFormDrawer
        config={config}
        mode={formMode}
        row={formRow}
        userId={user?.id ?? ""}
        onClose={closeFormDrawer}
        onSaved={() => void load()}
      />

      <ConfirmDialog
        open={Boolean(deleteRow)}
        title={`Delete ${config.singular}?`}
        message={`Are you sure you want to delete "${deleteLabel}"? This cannot be undone.`}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setDeleteRow(null)}
        loading={deleting}
      />
    </div>
  );
}
