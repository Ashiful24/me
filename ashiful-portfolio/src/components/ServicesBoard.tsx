"use client";

import { motion } from "framer-motion";

type ServiceItem = {
  tag: string;
  description: string;
};

/** Fits fixed note height with tag + wrapped body. */
const DESC_LIMIT = 110;

const NOTE_THEMES = [
  { border: "#007acc", tag: "#569cd6", rotate: "-2.2deg", pin: "#007acc" },
  { border: "#4ec9b0", tag: "#4ec9b0", rotate: "1.8deg", pin: "#4ec9b0" },
  { border: "#6a9955", tag: "#6a9955", rotate: "-1.4deg", pin: "#6a9955" },
  { border: "#ce9178", tag: "#ce9178", rotate: "2.1deg", pin: "#ce9178" },
  { border: "#c586c0", tag: "#c586c0", rotate: "-1.8deg", pin: "#c586c0" },
  { border: "#dcdcaa", tag: "#dcdcaa", rotate: "1.2deg", pin: "#dcdcaa" },
];

function clipDescription(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= DESC_LIMIT) return trimmed;
  return `${trimmed.slice(0, DESC_LIMIT).trimEnd()}…`;
}

function PushPin({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <span
        className="relative block h-4 w-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
        style={{ backgroundColor: color }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
      </span>
      <span
        className="absolute left-1/2 top-3 h-3 w-px -translate-x-1/2 bg-[#858585]"
        style={{ opacity: 0.8 }}
      />
    </span>
  );
}

export default function ServicesBoard({
  services,
}: {
  services: ServiceItem[];
}) {
  if (services.length === 0) {
    return (
      <p className="mt-6 font-mono text-sm text-[#858585]">
        No services published yet.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] shadow-xl shadow-black/25 sm:mt-10">
      <div className="flex items-center justify-between gap-3 border-b border-[#3c3c3c] bg-[#252526] px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] sm:text-xs">
          <span className="shrink-0 rounded-sm bg-[#007acc] px-2 py-0.5 text-white">
            BOARD
          </span>
          <span className="truncate text-[#858585]">
            ~/services/notice_board.md
          </span>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-[#858585]">
          {services.length} pinned
        </span>
      </div>

      <div
        className="relative max-h-[calc(2*13.5rem+1.75rem+5rem)] overflow-y-auto overscroll-contain px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-4 z-0 font-mono text-[10px] leading-5 text-[#3c3c3c] sm:text-xs"
        >
          {"// pin services here · hire-ready modules · export * from './offerings'"}
        </p>

        <ul className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-7">
          {services.map((service, index) => {
            const theme = NOTE_THEMES[index % NOTE_THEMES.length];
            const tag = (service.tag || "Service").trim();
            const description = clipDescription(service.description);

            return (
              <motion.li
                key={`${index}-${service.description.slice(0, 24)}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.06, 0.24),
                  ease: "easeOut",
                }}
                className="relative flex justify-center"
              >
                <div
                  className="w-full max-w-[280px] origin-top sm:max-w-none"
                  style={{ transform: `rotate(${theme.rotate})` }}
                >
                  <article
                    className="group relative flex h-[180px] flex-col overflow-hidden border bg-[#252526] px-4 pb-4 pt-7 shadow-[3px_6px_16px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1.5 hover:bg-[#2d2d30] hover:shadow-[4px_10px_22px_rgba(0,0,0,0.45)]"
                    style={{ borderColor: theme.border }}
                    title={service.description}
                  >
                    <PushPin color={theme.pin} />

                    <span
                      aria-hidden
                      className="absolute inset-x-3 top-0 h-px bg-[#3c3c3c]"
                    />

                    <p
                      className="shrink-0 break-words font-mono text-[10px] font-semibold tracking-wide"
                      style={{ color: theme.tag }}
                    >
                      {"// "}
                      {tag}
                    </p>

                    <p className="mt-2 min-h-0 flex-1 overflow-hidden break-words whitespace-pre-wrap font-mono text-xs leading-5 text-[#d4d4d4] sm:text-[13px] sm:leading-6">
                      {description}
                    </p>
                  </article>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
