"use client";

import { FiX } from "react-icons/fi";

export default function FormModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[var(--admin-overlay-strong)]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-[var(--admin-border)] px-4 py-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--admin-accent)]">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-[var(--admin-muted)]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-[var(--admin-hover)]"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
