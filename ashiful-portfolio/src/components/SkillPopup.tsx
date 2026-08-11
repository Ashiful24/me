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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-[#858585] bg-[#f0f0f0] shadow-2xl shadow-black/40">
        {/* Title bar — Windows style */}
        <div className="flex items-center justify-between bg-[#0078d4] px-3 py-2">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-semibold text-white">
              {skill.name}.dll — Skill Properties
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-6 w-8 place-items-center rounded-sm text-sm font-bold text-white/90 transition hover:bg-[#e81123]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Icon + name header */}
          <div className="mb-4 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#ccc] bg-white shadow-sm">
              <Icon className={`h-8 w-8 ${skill.color}`} />
            </div>
            <div>
              <p className="text-base font-bold text-[#1a1a1a]">
                {skill.name}
              </p>
              <p className="text-xs text-[#666]">
                Runtime Environment Detected
              </p>
            </div>
          </div>

          {/* Info sections */}
          <div className="space-y-3 rounded-md border border-[#ccc] bg-white p-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0078d4]">
                ⚡ Knowledge
              </p>
              <p className="mt-1 text-xs leading-5 text-[#333]">
                {skill.knowledge}
              </p>
            </div>

            <div className="border-t border-[#eee] pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0078d4]">
                🔧 Work Experience
              </p>
              <p className="mt-1 text-xs leading-5 text-[#333]">
                {skill.experience}
              </p>
            </div>

            <div className="border-t border-[#eee] pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0078d4]">
                📊 Stats
              </p>
              <p className="mt-1 text-xs leading-5 text-[#333]">
                {skill.stats}
              </p>
            </div>
          </div>
        </div>

        {/* Footer buttons — Windows style */}
        <div className="flex items-center justify-end gap-2 border-t border-[#ccc] bg-[#f0f0f0] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-[#adadad] bg-[#e1e1e1] px-6 py-1.5 text-xs font-semibold text-[#1a1a1a] shadow-sm transition hover:bg-[#d5d5d5] active:bg-[#c8c8c8]"
          >
            OK
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-[#adadad] bg-[#e1e1e1] px-6 py-1.5 text-xs font-semibold text-[#1a1a1a] shadow-sm transition hover:bg-[#d5d5d5] active:bg-[#c8c8c8]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
