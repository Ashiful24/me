"use client";

import { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";

export type ProjectCredential = {
  label: string;
  value: string;
};

export type Project = {
  file: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  credentials?: ProjectCredential[];
};

function CopyField({ label, value }: ProjectCredential) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-[#3c3c3c] px-3 py-2 last:border-b-0">
      <div className="min-w-0">
        <p className="font-mono text-[10px] text-[#569cd6]">{label}</p>
        <p className="truncate font-mono text-xs text-[#ce9178]">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded border border-[#3c3c3c] px-2 py-1 font-mono text-[10px] text-[#9cdcfe] transition hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

function ErdConnector({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#569cd6] bg-[#1e1e1e] ${
        side === "left" ? "-left-1.5" : "-right-1.5"
      }`}
    />
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [showCredentials, setShowCredentials] = useState(false);
  const hasCredentials = Boolean(project.credentials?.length);
  const credentials = project.credentials ?? [];

  return (
    <article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden bg-[#1e1e1e] shadow-[0_0_0_1px_#3c3c3c] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#569cd6,0_8px_24px_rgba(0,0,0,0.35)]">
      <ErdConnector side="left" />
      <ErdConnector side="right" />

      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#3c3c3c] bg-[#007acc] px-3 py-2.5">
        <p className="min-w-0 truncate font-mono text-[12px] font-bold tracking-wide text-white">
          {showCredentials ? "Credentials" : project.title}
        </p>
        {hasCredentials ? (
          showCredentials ? (
            <button
              type="button"
              title="Back"
              onClick={() => setShowCredentials(false)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded border border-white/30 text-white transition hover:bg-white/10"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              title="View credentials"
              onClick={() => setShowCredentials(true)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded border border-white/30 text-white transition hover:bg-white/10"
            >
              <BiNotepad className="h-3.5 w-3.5" />
            </button>
          )
        ) : null}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        {!showCredentials ? (
          <>
            <div className="min-h-0 flex-1 overflow-hidden border-b border-[#3c3c3c] px-3 py-3">
              <p className="line-clamp-6 font-mono text-xs leading-5 text-[#cccccc]">
                {project.description}
              </p>
            </div>

            <div className="shrink-0 border-b border-[#3c3c3c] px-3 py-2.5">
              <div className="flex min-h-[28px] max-h-[52px] flex-wrap gap-1.5 overflow-hidden">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#3c3c3c] bg-[#252526] px-2 py-0.5 font-mono text-[10px] text-[#9cdcfe]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex shrink-0 flex-wrap gap-2 px-3 py-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#3c3c3c] bg-[#252526] px-2.5 py-1.5 font-mono text-[10px] text-[#d4d4d4] transition hover:border-[#569cd6] hover:text-white"
                >
                  <FaGithub className="h-3 w-3" />
                  github
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 border border-[#3c3c3c]/60 bg-[#252526]/60 px-2.5 py-1.5 font-mono text-[10px] text-[#858585]">
                  <FaGithub className="h-3 w-3" />
                  private
                </span>
              )}

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#007acc]/50 bg-[#007acc]/15 px-2.5 py-1.5 font-mono text-[10px] text-[#9cdcfe] transition hover:border-[#007acc]"
                >
                  <FaExternalLinkAlt className="h-2.5 w-2.5" />
                  live
                </a>
              ) : null}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col bg-[#1e1e1e]">
            <div className="min-h-0 flex-1 overflow-y-auto">
              {credentials.map((credential) => (
                <CopyField
                  key={credential.label}
                  label={credential.label}
                  value={credential.value}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
