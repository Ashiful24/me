"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FiCheck, FiInfo, FiX } from "react-icons/fi";

export type ToastVariant = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastApi = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

type ToastContextValue = {
  toasts: ToastItem[];
  toast: ToastApi;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, variant: ToastVariant) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  const toast = useMemo<ToastApi>(
    () => ({
      success: (message) => push(message, "success"),
      error: (message) => push(message, "error"),
      info: (message) => push(message, "info"),
    }),
    [push],
  );

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, dismiss, toast }),
    [toasts, dismiss, toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx.toast;
}

function ToastViewport() {
  const ctx = useContext(ToastContext);
  if (!ctx || ctx.toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      {ctx.toasts.map((item) => (
        <ToastCard
          key={item.id}
          item={item}
          onDismiss={() => ctx.dismiss(item.id)}
        />
      ))}
    </div>
  );
}

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: () => void;
}) {
  const styles =
    item.variant === "success"
      ? "border-[#3c6]/50 bg-[#1a2e1a] text-[#6a9955]"
      : item.variant === "error"
        ? "border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] text-[var(--admin-danger)]"
        : "border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-text)]";

  const Icon =
    item.variant === "success"
      ? FiCheck
      : item.variant === "error"
        ? FiX
        : FiInfo;

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-3 py-3 shadow-lg animate-[toast-in_0.2s_ease-out] ${styles}`}
    >
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current/30">
        <Icon className="h-3 w-3" />
      </span>
      <p className="min-w-0 flex-1 text-sm leading-5">{item.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
        aria-label="Dismiss"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}
