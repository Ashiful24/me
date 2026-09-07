import Link from "next/link";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  username,
  hireHref,
  hasResume = false,
}: {
  username?: string;
  hireHref?: string;
  hasResume?: boolean;
}) {
  const hireIsExternal = Boolean(
    hireHref?.startsWith("http") || hireHref?.startsWith("mailto:"),
  );

  return (
    <header className="px-0 py-2 sm:py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-[#3c3c3c] bg-[#252526]/80 px-3 py-2.5 backdrop-blur sm:gap-4 sm:px-5 sm:py-3">
        <a
          href="#home"
          className="min-w-0 truncate font-mono text-xs font-semibold tracking-wide sm:text-sm"
        >
          <span className="text-[#569cd6]">~/</span>
          <span className="text-white">{username || "portfolio"}</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-[#cccccc] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="transition hover:text-white"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          {hasResume ? (
            <Link
              className="transition hover:text-white"
              href="/resume"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </Link>
          ) : null}
        </div>

        <a
          className="shrink-0 rounded-full bg-[#007acc] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#3794ff] sm:px-5 sm:py-2 sm:text-sm"
          href={hireHref || "#contact"}
          target={hireIsExternal ? "_blank" : undefined}
          rel={hireIsExternal ? "noreferrer" : undefined}
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}
