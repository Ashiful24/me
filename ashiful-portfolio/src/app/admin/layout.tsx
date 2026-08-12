"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-[#858585]">
        Loading...
      </div>
    );
  }

  if (isLogin) return <>{children}</>;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-[#858585]">
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
      <AdminGate>{children}</AdminGate>
    </AuthProvider>
  );
}
