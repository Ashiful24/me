"use client";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[var(--admin-overlay-strong)]"
        onClick={onCancel}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[var(--admin-accent)]">{title}</h3>
        <p className="mt-2 text-sm text-[var(--admin-text)]">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded bg-[var(--admin-secondary)] px-4 py-2 text-sm hover:bg-[var(--admin-hover-strong)] disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded bg-[var(--admin-danger-btn)] px-4 py-2 text-sm text-white hover:bg-[var(--admin-danger-btn-hover)] disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
