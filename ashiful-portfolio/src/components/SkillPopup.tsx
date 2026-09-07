"use client";

import { type IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";

export type SkillDetail = {
  name: string;
  icon: IconType;
  color: string;
  knowledge: string;
  experience: string;
  stats: string;
};

export default function SkillPopup({
  skill,
  onClose,
}: {
  skill: SkillDetail;
  onClose: () => void;
}) {
  const Icon = skill.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#252526] shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-[#3c3c3c] bg-[#2d2d30] px-3 py-2">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="h-3.5 w-3.5 text-[#cea700]" />
            <span className="font-mono text-xs font-semibold text-[#d4d4d4]">
              {skill.name}.dll — Skill Properties
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-6 w-8 place-items-center rounded-sm text-sm font-bold text-[#cccccc] transition hover:bg-[#e81123] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#3c3c3c] bg-[#1e1e1e]">
              <Icon className={`h-8 w-8 ${skill.color}`} />
            </div>
            <div>
              <p className="text-base font-bold text-[#d4d4d4]">{skill.name}</p>
              <p className="font-mono text-xs text-[#858585]">
                Runtime Environment Detected
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-md border border-[#3c3c3c] bg-[#1e1e1e] p-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#569cd6]">
                Knowledge
              </p>
              <p className="mt-1 text-xs leading-5 text-[#cccccc]">
                {skill.knowledge}
              </p>
            </div>

            <div className="border-t border-[#3c3c3c] pt-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#569cd6]">
                Work Experience
              </p>
              <p className="mt-1 text-xs leading-5 text-[#cccccc]">
                {skill.experience}
              </p>
            </div>

            <div className="border-t border-[#3c3c3c] pt-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#569cd6]">
                Stats
              </p>
              <p className="mt-1 text-xs leading-5 text-[#cccccc]">
                {skill.stats}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-[#3c3c3c] bg-[#2d2d30] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-[#3c3c3c] bg-[#007acc] px-6 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3794ff]"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
