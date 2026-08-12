import type { Project } from "@/components/ProjectCard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type PortfolioPayload = {
  profile: {
    name: string;
    title: string;
    bio: string;
    linkedInUrl: string;
    status: string;
    location: string;
    roles: string[];
  } | null;
  stats: { value: string; label: string }[];
  projects: {
    file: string;
    title: string;
    description: string;
    github: string | null;
    live: string | null;
    tags: { name: string }[];
    credentials: { label: string; value: string }[];
  }[];
  experiences: {
    title: string;
    subtitle: string;
    highlights: { text: string }[];
  }[];
  services: { description: string }[];
  timelineEntries: { year: string; title: string; text: string }[];
  testimonials: { quote: string; name: string; role: string }[];
  contactLinks: {
    label: string;
    value: string;
    href: string;
    iconKey: string;
    color: string;
  }[];
};

export async function fetchPortfolio(
  username = "ashiful_islam_istiuk",
): Promise<PortfolioPayload | null> {
  try {
    const res = await fetch(
      `${API_URL}/portfolio?username=${encodeURIComponent(username)}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as PortfolioPayload;
  } catch {
    return null;
  }
}

export function mapProjects(
  projects: PortfolioPayload["projects"],
): Project[] {
  return projects.map((p) => ({
    file: p.file,
    title: p.title,
    description: p.description,
    github: p.github ?? undefined,
    live: p.live ?? undefined,
    tags: p.tags.map((t) => t.name),
    credentials: p.credentials.map((c) => ({
      label: c.label,
      value: c.value,
    })),
  }));
}
