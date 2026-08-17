"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(emailOrPhone.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--admin-bg)] px-4">
      <div className="absolute right-4 top-4">
        <AdminThemeToggle />
      </div>
      <div className="w-full max-w-md rounded-xl border border-[var(--admin-border)] bg-[var(--admin-panel)] p-6 shadow-xl">
        <p className="font-mono text-xs text-[var(--admin-muted)]">POST /api/auth/login</p>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--admin-accent)]">
          Admin login
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Sign in with your admin email/phone and password. Tokens are stored
          locally for CRUD access.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Email or phone</span>
            <input
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
              placeholder="angkon199@gmail.com"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--admin-muted)]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 outline-none focus:border-[var(--admin-focus)]"
            />
          </label>

          {error && (
            <p className="rounded border border-[var(--admin-danger)]/40 bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[var(--admin-btn)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--admin-btn-hover)] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
