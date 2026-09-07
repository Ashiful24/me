"use client";

import { useState } from "react";
import SkillPopup, { type SkillDetail } from "./SkillPopup";
import { getIcon } from "@/lib/icons";
import type { SkillGroupPayload } from "@/lib/portfolio";

const COLLAPSED_COUNT = 6;

function SkillGroupRow({
  group,
  onSkillClick,
}: {
  group: SkillGroupPayload;
  onSkillClick: (skill: SkillGroupPayload["skills"][number]) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = group.skills.length > COLLAPSED_COUNT;
  const visibleSkills =
    expanded || !hasMore
      ? group.skills
      : group.skills.slice(0, COLLAPSED_COUNT);

  return (
    <div className="rounded-2xl border border-[#3c3c3c] bg-[#252526] p-4 sm:rounded-[2rem] sm:p-6">
      <h3
        className="break-words font-mono text-xs text-[#569cd6] sm:truncate sm:text-sm"
        title={group.title}
      >
        import {"{"} {group.title.toLowerCase().replace(/\s+/g, "_")} {"}"} from
        &apos;./stack&apos;;
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2.5 pt-1 sm:mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {visibleSkills.map((skill) => {
          const Icon = getIcon(skill.iconKey);

          return (
            <button
              type="button"
              key={skill.id}
              onClick={() => onSkillClick(skill)}
              className="group flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#3c3c3c] bg-[#1e1e1e] p-3 text-center transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30] active:scale-95 sm:min-h-28 sm:rounded-3xl sm:p-4"
            >
              <Icon
                aria-hidden="true"
                className={`h-7 w-7 transition group-hover:scale-110 sm:h-9 sm:w-9 ${skill.color}`}
              />
              <span className="mt-3 line-clamp-2 text-xs font-semibold text-white/80 sm:mt-4 sm:text-sm">
                {skill.title}
              </span>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="font-mono text-sm text-[#569cd6] transition hover:text-[#9cdcfe]"
          >
            {expanded
              ? "← less"
              : `more (${group.skills.length - COLLAPSED_COUNT}) →`}
          </button>
        </div>
      )}
    </div>
  );
}

export default function SkillsGrid({
  groups,
}: {
  groups: SkillGroupPayload[];
}) {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);

  if (!groups.length) {
    return (
      <p className="mt-10 font-mono text-sm text-[#858585]">
        No skills published yet.
      </p>
    );
  }

  const handleSkillClick = (skill: SkillGroupPayload["skills"][number]) => {
    if (!skill.detail) return;
    setActiveSkill({
      name: skill.title,
      icon: getIcon(skill.iconKey),
      color: skill.color,
      knowledge: skill.detail.knowledge,
      experience: skill.detail.experience,
      stats: skill.detail.stats,
    });
  };

  return (
    <>
      <div className="mt-10 grid gap-5">
        {groups.map((group) => (
          <SkillGroupRow
            key={group.id}
            group={group}
            onSkillClick={handleSkillClick}
          />
        ))}
      </div>

      {activeSkill && (
        <SkillPopup skill={activeSkill} onClose={() => setActiveSkill(null)} />
      )}
    </>
  );
}
