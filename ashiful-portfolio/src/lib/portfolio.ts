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
    showTestimonials: boolean;
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
  services: { tag: string; description: string }[];
  timelineEntries: {
    year: string;
    title: string;
    subtitle: string;
    text: string;
  }[];
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
  username = process.env.NEXT_PUBLIC_PORTFOLIO_USERNAME?.trim() || "",
): Promise<PortfolioPayload | null> {
  if (!username) return null;
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

function normalizeContactKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Phone / Gmail / WhatsApp — shown in Contact terminal only. */
export function isDirectContactLink(link: {
  label: string;
  href: string;
  iconKey: string;
}) {
  const label = normalizeContactKey(link.label);
  const href = link.href.trim().toLowerCase();
  const icon = link.iconKey;

  if (
    label.includes("phone") ||
    label.includes("mobile") ||
    label === "tel" ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    icon === "FaPhoneAlt"
  ) {
    return true;
  }

  if (
    label.includes("email") ||
    label.includes("gmail") ||
    label === "mail" ||
    href.startsWith("mailto:") ||
    href.includes("mail.google.com") ||
    icon === "SiGmail"
  ) {
    return true;
  }

  if (
    label.includes("whatsapp") ||
    href.includes("wa.me") ||
    href.includes("whatsapp.com") ||
    icon === "FaWhatsapp" ||
    icon === "SiWhatsapp"
  ) {
    return true;
  }

  return false;
}

export function splitContactLinks(
  links: PortfolioPayload["contactLinks"],
) {
  const contactLinks = links.filter(isDirectContactLink);
  const footerLinks = links.filter((link) => !isDirectContactLink(link));
  return { contactLinks, footerLinks };
}
