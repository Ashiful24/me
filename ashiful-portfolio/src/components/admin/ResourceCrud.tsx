"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { ResourceConfig } from "@/lib/admin-resources";

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
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = useMemo(() => {
    const form: Record<string, string> = {};
    for (const field of config.fields) {
      if (field.fromUserId && user?.id) form[field.key] = user.id;
      else form[field.key] = "";
    }
    return form;
  }, [config.fields, user?.id]);

  const [form, setForm] = useState<Record<string, string>>(emptyForm);

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

  useEffect(() => {
    if (!editing && !creating) setForm(emptyForm);
  }, [emptyForm, editing, creating]);

  const openCreate = () => {
    setEditing(null);
    setCreating(true);
    setForm(emptyForm);
  };

  const openEdit = (row: Row) => {
    setCreating(false);
    setEditing(row);
    const next: Record<string, string> = {};
    for (const field of config.fields) {
      const value = row[field.key];
      next[field.key] =
        value === null || value === undefined ? "" : String(value);
    }
    setForm(next);
  };

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const buildPayload = () => {
    const payload: Record<string, unknown> = {};
    for (const field of config.fields) {
      const raw = form[field.key]?.trim() ?? "";
      if (!raw) {
        if (field.required && !editing) {
          throw new Error(`${field.label} is required`);
        }
        continue;
      }
      if (field.type === "number") payload[field.key] = Number(raw);
      else payload[field.key] = raw;
    }
    return payload;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = buildPayload();
      if (editing) {
        await apiFetch(`${config.path}/${editing.id}`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await apiFetch(config.path, { method: "POST", body: payload });
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row: Row) => {
    if (!confirm(`Delete this ${config.label.toLowerCase()} item?`)) return;
    setError(null);
    try {
      await apiFetch(`${config.path}/${row.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    }
  };

  const canCreate = config.key !== "users";
  const canDelete = config.key !== "users";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-[#9cdcfe]">{config.label}</h2>
          <p className="mt-1 text-sm text-[#858585]">
            Live data from <code className="text-[#ce9178]">{config.path}</code>
          </p>
        </div>
        {canCreate && (
          <button
            type="button"
            onClick={openCreate}
            className="rounded bg-[#0e639c] px-4 py-2 text-sm font-medium text-white hover:bg-[#1177bb]"
          >
            Add new
          </button>
        )}
      </div>

      {error && (
        <div className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
          {error}
        </div>
      )}

      {(creating || editing) && (
        <form
          onSubmit={onSubmit}
          className="space-y-3 rounded-lg border border-[#3c3c3c] bg-[#252526] p-4"
        >
          <h3 className="font-medium text-[#dcdcaa]">
            {editing ? "Edit item" : "Create item"}
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {config.fields
              .filter((f) => f.type !== "hidden")
              .map((field) => (
                <label key={field.key} className="block text-sm">
                  <span className="mb-1 block text-[#858585]">
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      value={form[field.key] ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full rounded border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 outline-none focus:border-[#007acc]"
                    />
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      value={form[field.key] ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="w-full rounded border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 outline-none focus:border-[#007acc]"
                    />
                  )}
                </label>
              ))}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-[#0e639c] px-4 py-2 text-sm text-white hover:bg-[#1177bb] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="rounded bg-[#3c3c3c] px-4 py-2 text-sm hover:bg-[#4e4e4e]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#3c3c3c]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#2d2d30] text-[#858585]">
            <tr>
              {config.columns.map((col) => (
                <th key={col.key} className="px-3 py-2 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-3 py-6 text-[#858585]"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-3 py-6 text-[#858585]"
                >
                  No records yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-[#3c3c3c]">
                  {config.columns.map((col) => (
                    <td key={col.key} className="max-w-xs truncate px-3 py-2">
                      {cellValue(row[col.key])}
                    </td>
                  ))}
                  <td className="space-x-2 px-3 py-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="text-[#9cdcfe] hover:underline"
                    >
                      Edit
                    </button>
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => void onDelete(row)}
                        className="text-[#f14c4c] hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
