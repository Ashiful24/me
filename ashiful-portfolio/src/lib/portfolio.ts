import type { Project } from "@/components/ProjectCard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type SkillDetailPayload = {
  knowledge: string;
  experience: string;
  stats: string;
};

export type SkillPayload = {
  id: string;
  title: string;
  iconKey: string;
  color: string;
  detail: SkillDetailPayload | null;
};

export type SkillGroupPayload = {
  id: string;
  title: string;
  skills: SkillPayload[];
};

export type PortfolioPayload = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  profile: {
    name: string;
    title: string;
    bio: string;
    location: string;
    status: string;
    avatarUrl: string;
    linkedInUrl: string;
    resumeUrl: string;
    siteUrl: string;
    siteTitle: string;
    siteDescription: string;
    roles: string[];
  } | null;
  stats: { value: string; label: string }[];
  projects: {
    id: string;
    file: string;
    title: string;
    description: string;
    github: string | null;
    live: string | null;
    tags: { name: string }[];
    credentials: { label: string; value: string }[];
  }[];
  experiences: {
    id: string;
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
  skillGroups: SkillGroupPayload[];
};

export async function fetchPortfolio(
  username = "ashiful_islam_istiuk",
): Promise<PortfolioPayload | null> {
  try {
    const res = await fetch(
      `${API_URL}/portfolio?username=${encodeURIComponent(username)}`,
      { cache: "no-store" },
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

export function hireHrefFromContacts(
  contacts: PortfolioPayload["contactLinks"],
  email?: string,
) {
  const mail = contacts.find(
    (c) =>
      c.href.startsWith("mailto:") ||
      c.href.includes("mail.google.com") ||
      c.iconKey === "SiGmail",
  );
  if (mail?.href) return mail.href;
  if (email) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=Portfolio%20Inquiry`;
  }
  return "#contact";
}

export function linkedInHandle(url: string) {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    const handle = path.split("/").filter(Boolean).pop();
    return handle || "linkedin";
  } catch {
    return "linkedin";
  }
}
