"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  text: string;
};

/** Git Graph-style lane colors (VS Code / Git Graph palette). */
const GRAPH_COLORS = [
  "#39c5cf",
  "#e2c08d",
  "#c586c0",
  "#89d185",
  "#569cd6",
  "#ce9178",
];

export default function EducationTimeline({
  entries,
}: {
  entries: TimelineItem[];
}) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 font-mono text-sm text-[#858585]">
        No timeline entries yet.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] shadow-xl shadow-black/20 sm:mt-10">
      <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#252526] px-3 py-2.5 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-[#858585]">
          Git Graph — education
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-0 sm:min-w-[40rem]">
          <div className="hidden grid-cols-[3.5rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(8rem,0.6fr)] border-b border-[#3c3c3c] bg-[#252526] px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-[#858585] sm:grid">
            <span className="pl-1">Graph</span>
            <span>Description</span>
            <span>Author / Place</span>
            <span className="pr-2 text-right">Date</span>
          </div>

          <ul>
            {entries.map((item, index) => {
              const color = GRAPH_COLORS[index % GRAPH_COLORS.length];
              const isLast = index === entries.length - 1;
              const shortHash = (index + 1).toString(16).padStart(7, "0");

              return (
                <motion.li
                  key={`${item.title}-${item.year}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-[#2a2a2a] transition hover:bg-[#2a2d2e] sm:grid-cols-[3.5rem_minmax(0,1.5fr)_minmax(0,1fr)_minmax(8rem,0.6fr)]"
                >
                  <div className="relative flex justify-center">
                    {!isLast ? (
                      <span
                        className="absolute bottom-0 left-1/2 top-[1.35rem] w-0.5 -translate-x-1/2"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                    ) : null}
                    <span
                      className="relative z-10 mt-3 h-3.5 w-3.5 rounded-full border-2 border-[#1e1e1e] shadow-[0_0_0_1px_currentColor]"
                      style={{ backgroundColor: color, color }}
                      aria-hidden
                    />
                  </div>

                  <div className="min-w-0 py-3 pr-3 sm:contents">
                    <div className="min-w-0 sm:py-3 sm:pr-3">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span
                          className="font-mono text-[10px] sm:text-[11px]"
                          style={{ color }}
                        >
                          {shortHash}
                        </span>
                        <p className="break-words text-sm font-semibold text-[#d4d4d4] sm:text-[15px]">
                          {item.title}
                        </p>
                      </div>
                      {item.text ? (
                        <p className="mt-1 line-clamp-2 break-words font-mono text-[11px] leading-5 text-[#858585] sm:text-xs">
                          {item.text}
                        </p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 sm:hidden">
                        {item.subtitle ? (
                          <p className="break-words font-mono text-[11px] text-[#9cdcfe]">
                            {item.subtitle}
                          </p>
                        ) : null}
                        <p className="font-mono text-[11px] text-[#ce9178]">
                          {item.year}
                        </p>
                      </div>
                    </div>

                    <div className="hidden min-w-0 py-3 pr-3 sm:block">
                      <p className="break-words font-mono text-xs text-[#cccccc]">
                        {item.subtitle || "—"}
                      </p>
                    </div>

                    <div className="hidden py-3 pr-3 text-right sm:block">
                      <p className="font-mono text-xs leading-5 text-[#ce9178]">
                        {item.year}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#3c3c3c] bg-[#007acc] px-3 py-1.5">
        <span className="font-mono text-[10px] text-white/85">
          {entries.length} commit{entries.length === 1 ? "" : "s"}
        </span>
        <span className="font-mono text-[10px] text-white/85">
          main · education
        </span>
      </div>
    </div>
  );
}
