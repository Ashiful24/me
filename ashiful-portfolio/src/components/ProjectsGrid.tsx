"use client";

import { useState } from "react";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import { useResponsiveLimit } from "@/hooks/useResponsiveLimit";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const initialVisible = useResponsiveLimit({
    mobile: 3,
    tablet: 4,
    desktop: 6,
  });

  if (projects.length === 0) {
    return (
      <p className="mt-6 font-mono text-sm text-[#858585]">
        No projects published yet.
      </p>
    );
  }

  const hasMore = projects.length > initialVisible;
  const visibleProjects =
    expanded || !hasMore ? projects : projects.slice(0, initialVisible);

  return (
    <div className="mt-6">
      <div className="grid auto-rows-[360px] gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="font-mono text-sm text-[#569cd6] transition hover:text-[#9cdcfe]"
          >
            {expanded
              ? "← less"
              : `more (${projects.length - initialVisible}) →`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
