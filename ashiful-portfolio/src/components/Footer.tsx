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
  color?: string;
};

export default function Footer({
  name,
  title,
  location,
  username,
  socialLinks,
}: {
  name?: string;
  title?: string;
  location?: string;
  username?: string;
  socialLinks?: SocialLink[];
}) {
  const year = new Date().getFullYear();
  const displayName = name || "Portfolio";

  return (
    <footer className="border-t border-[#3c3c3c] bg-[#252526]/40 px-4 pb-28 pt-10 sm:px-10 sm:pb-12 sm:pt-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 max-w-md">
            <p className="font-mono text-xs text-[#6a9955]">
              {username ? `~/${username}` : "// footer"}
            </p>
            <p className="mt-2 break-words text-xl font-black tracking-tight text-[#d4d4d4] sm:text-2xl">
              {displayName}
            </p>
            {(title || location) && (
              <p className="mt-2 break-words text-sm leading-6 text-[#858585]">
                {[title, location].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#cccccc]"
          >
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

          {socialLinks && socialLinks.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.iconKey);

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] transition hover:border-[#007acc]/50 hover:bg-[#2d2d30]"
                  >
                    <Icon
                      className={`h-4 w-4 ${social.color || "text-[#9cdcfe]"}`}
                    />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-[#3c3c3c] pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="break-words font-mono text-xs text-[#858585]">
            © {year} {displayName}
          </p>
          <a
            href="#home"
            className="font-mono text-xs text-[#569cd6] transition hover:text-[#9cdcfe]"
          >
            ↑ back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
