"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api";

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
    <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] px-4">
      <div className="w-full max-w-md rounded-xl border border-[#3c3c3c] bg-[#252526] p-6 shadow-xl">
        <p className="font-mono text-xs text-[#858585]">POST /api/auth/login</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#9cdcfe]">
          Admin login
        </h1>
        <p className="mt-1 text-sm text-[#858585]">
          Sign in with your admin email/phone and password. Tokens are stored
          locally for CRUD access.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-[#858585]">Email or phone</span>
            <input
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 outline-none focus:border-[#007acc]"
              placeholder="angkon199@gmail.com"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[#858585]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 outline-none focus:border-[#007acc]"
            />
          </label>

          {error && (
            <p className="rounded border border-[#f14c4c]/40 bg-[#5a1d1d]/40 px-3 py-2 text-sm text-[#f14c4c]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#0e639c] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1177bb] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
