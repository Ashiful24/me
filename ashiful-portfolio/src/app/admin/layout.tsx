"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AdminThemeProvider } from "@/contexts/AdminThemeContext";
import AdminShell from "@/components/admin/AdminShell";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { ready, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated && !isLogin) {
      router.replace("/admin/login");
    } else if (isAuthenticated && isLogin) {
      router.replace("/admin");
    }
  }, [ready, isAuthenticated, isLogin, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--admin-bg)] text-[var(--admin-muted)]">
        Loading...
      </div>
    );
  }

  if (isLogin) return <>{children}</>;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--admin-bg)] text-[var(--admin-muted)]">
        Redirecting to login...
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminThemeProvider>
        <AdminGate>{children}</AdminGate>
      </AdminThemeProvider>
    </AuthProvider>
  );
}
