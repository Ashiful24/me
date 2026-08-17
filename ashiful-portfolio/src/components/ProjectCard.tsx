"use client";

import { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
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
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-[#858585]">
          {label}
        </p>
        <p className="truncate font-mono text-xs text-[#ce9178]">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-md border border-[#3c3c3c] px-2 py-1 font-mono text-[10px] text-[#9cdcfe] transition hover:border-[#007acc]/60 hover:bg-[#2d2d30]"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [showCredentials, setShowCredentials] = useState(false);
  const hasCredentials = Boolean(project.credentials?.length);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#3c3c3c] bg-[#252526] transition hover:-translate-y-1 hover:border-[#007acc]/60 hover:bg-[#2d2d30]">
      <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#1e1e1e] px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-1 truncate font-mono text-[11px] text-[#858585]">
          {showCredentials ? "demo_credentials.env" : project.file}
        </span>
      </div>

      {showCredentials && hasCredentials ? (
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] text-[#6a9955]">
                {"// credentials"}
              </p>
              <h3 className="mt-1 truncate text-xl font-bold">{project.title}</h3>
            </div>
            <button
              type="button"
              title="Back to project"
              onClick={() => setShowCredentials(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#3c3c3c] text-[#9cdcfe] transition hover:border-[#007acc]/60 hover:bg-[#1e1e1e]"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-1 flex-col justify-start space-y-2">
            {project.credentials!.map((credential) => (
              <CopyField
                key={credential.label}
                label={credential.label}
                value={credential.value}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 text-xl font-bold">{project.title}</h3>
            {hasCredentials ? (
              <button
                type="button"
                title="View credentials"
                onClick={() => setShowCredentials(true)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#9cdcfe] transition hover:bg-[#1e1e1e] hover:text-white"
              >
                <FaExternalLinkAlt className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          <p className="mt-3 flex-1 font-mono text-xs leading-6 text-white/60">
            {project.description.length > 250
              ? `${project.description.slice(0, 250).trimEnd()}…`
              : project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#3c3c3c] bg-[#1e1e1e] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#9cdcfe]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#3c3c3c] pt-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 font-mono text-[11px] text-[#d4d4d4] transition hover:border-[#007acc]/60 hover:text-white"
              >
                <FaGithub className="h-3.5 w-3.5" />
                GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#3c3c3c]/60 bg-[#1e1e1e]/60 px-3 py-2 font-mono text-[11px] text-[#858585]">
                <FaGithub className="h-3.5 w-3.5" />
                private
              </span>
            )}

            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#007acc]/40 bg-[#007acc]/10 px-3 py-2 font-mono text-[11px] text-[#9cdcfe] transition hover:border-[#007acc] hover:bg-[#007acc]/20"
              >
                <FaExternalLinkAlt className="h-3 w-3" />
                Live
              </a>
            ) : null}
          </div>
        </div>
      )}
    </article>
  );
}
