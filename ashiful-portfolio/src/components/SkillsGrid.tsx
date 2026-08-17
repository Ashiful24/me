"use client";

import { useState } from "react";
import SkillPopup, { type SkillDetail } from "./SkillPopup";
import { getIcon } from "@/lib/icons";
import type { SkillGroupPayload } from "@/lib/portfolio";

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
          <div
            key={group.id}
            className="rounded-[2rem] border border-[#3c3c3c] bg-[#252526] p-6"
          >
            <h3 className="font-mono text-sm text-[#569cd6]">
              import {"{"} {group.title.toLowerCase().replace(/\s+/g, "_")}{" "}
              {"}"} from &apos;./stack&apos;;
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {group.skills.map((skill) => {
                const Icon = getIcon(skill.iconKey);

                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() => handleSkillClick(skill)}
                    className="group flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#3c3c3c] bg-[#1e1e1e] p-4 text-center transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30] active:scale-95"
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-9 w-9 transition group-hover:scale-110 ${skill.color}`}
                    />
                    <span className="mt-4 text-sm font-semibold text-white/80">
                      {skill.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {activeSkill && (
        <SkillPopup skill={activeSkill} onClose={() => setActiveSkill(null)} />
      )}
    </>
  );
}
