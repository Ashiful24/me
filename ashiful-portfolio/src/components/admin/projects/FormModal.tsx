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
        className="absolute inset-0 bg-black/65"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#252526] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-[#3c3c3c] px-4 py-3">
          <div>
            <h3 className="text-lg font-semibold text-[#9cdcfe]">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-[#858585]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-[#2a2d2e]"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
