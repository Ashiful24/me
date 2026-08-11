import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | K. M. Ashiful Islam Istiuk",
  description:
    "Resume of K. M. Ashiful Islam Istiuk, Junior Software Engineer.",
};

export default function ResumePage() {
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

      <iframe
        title="K. M. Ashiful Islam Istiuk Resume"
        src="/resume.pdf"
        className="min-h-0 flex-1 w-full bg-[#525252]"
      />
    </main>
  );
}
