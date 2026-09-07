"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useResponsiveLimit } from "@/hooks/useResponsiveLimit";

type ExperienceItem = {
  id: string;
  title: string;
  subtitle: string;
  highlights: { text: string }[];
};

function splitSubtitle(subtitle: string): { company: string; period: string } {
  const parts = subtitle
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return {
      company: parts[0],
      period: parts.slice(1).join(" · "),
    };
  }
  return { company: subtitle, period: "" };
}

export default function ExperiencesSection({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  const [expanded, setExpanded] = useState(false);
  const initialVisible = useResponsiveLimit(1, 2);

  if (experiences.length === 0) {
    return (
      <p className="mt-6 font-mono text-sm text-[#858585]">
        No experience entries yet.
      </p>
    );
  }

  const hasMore = experiences.length > initialVisible;
  const visibleExperiences =
    expanded || !hasMore
      ? experiences
      : experiences.slice(0, initialVisible);
  const remaining = experiences.length - initialVisible;

  return (
    <div className="relative mt-8 sm:mt-12">
      <div
        className="absolute bottom-4 left-3 top-4 w-px bg-gradient-to-b from-[#007acc] via-[#3c3c3c] to-transparent sm:left-4 lg:left-[calc(32%-1px)]"
        aria-hidden
      />

      <ol className="space-y-10 sm:space-y-14">
        {visibleExperiences.map((experience, index) => {
          const { company, period } = splitSubtitle(experience.subtitle);

          return (
            <motion.li
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.05, 0.2),
                ease: "easeOut",
              }}
              className="relative grid gap-4 pl-8 sm:gap-5 sm:pl-10 lg:grid-cols-[32%_1fr] lg:gap-10 lg:pl-0"
            >
              <span
                className="absolute left-3 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#007acc] bg-[#1e1e1e] shadow-[0_0_0_4px_#1e1e1e] sm:left-4 lg:left-[32%]"
                aria-hidden
              />

              <header className="min-w-0 lg:pr-8 lg:text-right">
                <p className="font-mono text-xs tracking-wide text-[#6a9955] sm:text-sm">
                  {"// role_"}
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 break-words text-2xl font-black tracking-tight text-[#d4d4d4] sm:text-3xl md:text-4xl sm:leading-tight">
                  {experience.title}
                </h3>

                {(company || period) && (
                  <div className="mt-3 space-y-1">
                    {company ? (
                      <p className="break-words text-sm font-medium text-[#cccccc] sm:text-lg">
                        {company}
                      </p>
                    ) : null}
                    {period ? (
                      <p className="break-words font-mono text-xs text-[#858585] sm:text-sm">
                        {period}
                      </p>
                    ) : null}
                  </div>
                )}
              </header>

              <div className="min-w-0 lg:pl-8">
                {experience.highlights.length === 0 ? (
                  <p className="font-mono text-sm text-[#858585]">
                    No highlights for this role yet.
                  </p>
                ) : (
                  <ul className="space-y-3 border-l border-[#3c3c3c] pl-4 sm:space-y-4">
                    {experience.highlights.map((highlight, hIndex) => (
                      <li
                        key={`${experience.id}-${hIndex}-${highlight.text.slice(0, 24)}`}
                        className="relative"
                      >
                        <span
                          className="absolute -left-[1.15rem] top-2 h-1.5 w-1.5 rounded-full bg-[#007acc] sm:top-2.5"
                          aria-hidden
                        />
                        <p className="break-words text-sm leading-7 text-[#cccccc] sm:text-base sm:leading-8 md:text-lg">
                          <span className="mr-2 font-mono text-[10px] text-[#6a9955] sm:text-xs">
                            {String(hIndex + 1).padStart(2, "0")}
                          </span>
                          {highlight.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>

      {hasMore ? (
        <div className="relative z-10 mt-8 flex justify-center sm:mt-10 lg:justify-start">
          <div className="lg:absolute lg:left-[calc(32%+2.25rem)] lg:-translate-x-1/2">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="bg-[#1e1e1e] px-2 font-mono text-sm text-[#569cd6] transition hover:text-[#9cdcfe]"
            >
              {expanded ? "← less" : `more (${remaining}) →`}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
