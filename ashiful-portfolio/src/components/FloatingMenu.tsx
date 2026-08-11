"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-5 z-50 grid h-12 w-12 place-items-center rounded-xl border border-[#3c3c3c] bg-[#252526]/95 shadow-lg shadow-black/30 backdrop-blur transition hover:border-[#007acc]/60 hover:bg-[#2d2d30] md:hidden sm:bottom-8 sm:right-8"
      >
        <div className="flex w-[18px] flex-col items-center gap-[5px]">
          <span
            className={`block h-[2px] w-full rounded-full bg-[#d4d4d4] transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full rounded-full bg-[#d4d4d4] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full rounded-full bg-[#d4d4d4] transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute bottom-24 right-5 w-[calc(100%-2.5rem)] max-w-sm overflow-hidden rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl shadow-black/50 sm:bottom-28 sm:right-8">
            <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#252526] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-[#858585]">
                navigation.ts
              </span>
            </div>

            <div className="p-3">
              <p className="px-3 pb-2 font-mono text-[10px] text-[#6a9955]">
                {"// quick_open"}
              </p>
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm text-[#d4d4d4] transition hover:bg-[#2d2d30]"
                >
                  <span className="w-5 select-none text-right text-[11px] text-[#858585]">
                    {index + 1}
                  </span>
                  <span className="text-[#569cd6]">goto</span>
                  <span className="text-[#ce9178]">
                    &quot;{link.label}&quot;
                  </span>
                </a>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm text-[#d4d4d4] transition hover:bg-[#2d2d30]"
              >
                <span className="w-5 select-none text-right text-[11px] text-[#858585]">
                  {navLinks.length + 1}
                </span>
                <span className="text-[#569cd6]">goto</span>
                <span className="text-[#ce9178]">&quot;Resume&quot;</span>
              </Link>
            </div>

            <div className="flex items-center justify-between border-t border-[#3c3c3c] bg-[#007acc] px-4 py-1.5">
              <span className="font-mono text-[10px] text-white/80">main</span>
              <span className="font-mono text-[10px] text-white/80">
                UTF-8 · TypeScript
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
