import type { Metadata } from "next";
import Link from "next/link";
import { fetchPortfolio } from "@/lib/portfolio";
import { resolveAssetUrl } from "@/lib/auth-storage";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await fetchPortfolio();
  const name = portfolio?.profile?.name ?? "Portfolio";
  return {
    title: `Resume | ${name}`,
    description: portfolio?.profile?.siteDescription ?? `Resume of ${name}.`,
  };
}

export default async function ResumePage() {
  const portfolio = await fetchPortfolio();
  const resumeUrl = resolveAssetUrl(portfolio?.profile?.resumeUrl);
  const name = portfolio?.profile?.name ?? "Resume";

  return (
    <main className="flex h-screen flex-col bg-[#1e1e1e]">
      <div className="shrink-0 border-b border-[#3c3c3c] bg-[#252526] px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-[#9cdcfe] transition hover:text-white"
        >
          ← Back to portfolio
        </Link>
      </div>

      {resumeUrl ? (
        <iframe
          title={`${name} Resume`}
          src={resumeUrl}
          className="min-h-0 flex-1 w-full bg-[#525252]"
        />
      ) : (
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="font-mono text-sm text-[#858585]">
            No resume uploaded yet.
          </p>
        </div>
      )}
    </main>
  );
}
