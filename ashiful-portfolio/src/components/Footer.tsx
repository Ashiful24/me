import { getIcon } from "@/lib/icons";

const quickLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

type SocialLink = {
  label: string;
  href: string;
  iconKey: string;
};

export default function Footer({
  name,
  title,
  location,
  socialLinks,
}: {
  name?: string;
  title?: string;
  location?: string;
  socialLinks?: SocialLink[];
}) {
  const year = new Date().getFullYear();
  const displayName = name || "Portfolio";

  return (
    <footer className="border-t border-[#3c3c3c] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-white">
            {displayName.toUpperCase()}
          </p>
          {(title || location) && (
            <p className="mt-2 text-sm text-[#8a8a8a]">
              {[title, location].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#cccccc]">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-[#9cdcfe]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = getIcon(social.iconKey);

              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#3c3c3c] bg-[#252526] text-[#cccccc] transition hover:border-[#007acc]/60 hover:text-[#9cdcfe]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-[#6a6a6a] sm:text-left">
        © {year} {displayName}. Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
}
