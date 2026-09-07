"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { apiFetch } from "@/lib/api";
import { ICON_KEYS } from "@/lib/icons";
import type { FieldConfig, ResourceConfig } from "@/lib/admin-resources";
import { useToast } from "@/contexts/ToastContext";

type Row = Record<string, unknown> & { id: string };

const inputClass =
  "w-full rounded border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]";

export default function ResourceFormDrawer({
  config,
  mode,
  row,
  userId,
  onClose,
  onSaved,
}: {
  config: ResourceConfig;
  mode: "create" | "edit" | null;
  row: Row | null;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const visibleFields = useMemo(
    () => config.fields.filter((field) => field.type !== "hidden"),
    [config.fields],
  );

  const emptyForm = useMemo(() => {
    const form: Record<string, string> = {};
    for (const field of visibleFields) form[field.key] = "";
    return form;
  }, [visibleFields]);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (mode === "edit" && row) {
      const next: Record<string, string> = {};
      for (const field of visibleFields) {
        const value = row[field.key];
        next[field.key] =
          value === null || value === undefined ? "" : String(value);
      }
      setForm(next);
    } else if (mode === "create") {
      setForm(emptyForm);
    }
  }, [mode, row, emptyForm, visibleFields]);

  if (!mode) return null;

  const buildPayload = () => {
    const payload: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.fromUserId) {
        if (mode === "create") payload[field.key] = userId;
        continue;
      }
      const raw = form[field.key]?.trim() ?? "";
      if (!raw) {
        if (field.required) throw new Error(`${field.label} is required`);
        continue;
      }
      payload[field.key] = field.type === "number" ? Number(raw) : raw;
    }
    return payload;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload();
      if (mode === "edit" && row) {
        await apiFetch(`${config.path}/${row.id}`, {
          method: "PATCH",
          body: payload,
        });
        toast.success(`${config.singular} updated.`);
      } else {
        await apiFetch(config.path, { method: "POST", body: payload });
        toast.success(`${config.singular} created.`);
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: FieldConfig) => {
    if (field.key === "iconKey") {
      return (
        <select
          value={form[field.key] ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
          }
          required={field.required}
          className={inputClass}
        >
          <option value="" disabled>
            Select icon
          </option>
          {ICON_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          value={form[field.key] ?? ""}
          onChange={(e) => {
            const value =
              field.maxLength != null
                ? e.target.value.slice(0, field.maxLength)
                : e.target.value;
            setForm((prev) => ({ ...prev, [field.key]: value }));
          }}
          required={field.required}
          maxLength={field.maxLength}
          rows={4}
          className={inputClass}
        />
      );
    }

    return (
      <input
        type={field.type === "number" ? "number" : "text"}
        value={form[field.key] ?? ""}
        onChange={(e) => {
          const value =
            field.maxLength != null
              ? e.target.value.slice(0, field.maxLength)
              : e.target.value;
          setForm((prev) => ({ ...prev, [field.key]: value }));
        }}
        required={field.required}
        maxLength={field.maxLength}
        className={inputClass}
      />
    );
  };

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
            {mode === "create"
              ? `Create ${config.singular}`
              : `Edit ${config.singular}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-[var(--admin-hover)]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {visibleFields.map((field) => (
              <label key={field.key} className="block text-sm">
                <span className="mb-1 flex items-center justify-between gap-2 text-[var(--admin-muted)]">
                  <span>
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  {field.maxLength != null ? (
                    <span className="font-mono text-[11px]">
                      {(form[field.key] ?? "").length}/{field.maxLength}
                    </span>
                  ) : null}
                </span>
                {renderField(field)}
              </label>
            ))}
          </div>

          <div className="flex gap-2 border-t border-[var(--admin-border)] bg-[var(--admin-panel)] p-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded bg-[var(--admin-btn)] py-2.5 text-sm font-medium text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : mode === "create"
                  ? `Create ${config.singular}`
                  : "Save changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded bg-[var(--admin-secondary)] px-5 py-2.5 text-sm hover:bg-[var(--admin-hover-strong)] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
