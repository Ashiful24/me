import Link from "next/link";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="px-0 py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#3c3c3c] bg-[#252526]/80 px-5 py-3 backdrop-blur">
        <a
          href="#home"
          className="font-mono text-xs font-semibold tracking-wide sm:text-sm"
        >
          <span className="text-[#569cd6]">~/</span>
          <span className="text-white">ashiful_islam_istiuk</span>
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
          <Link className="transition hover:text-white" href="/resume">
            Resume
          </Link>
          <Link className="transition hover:text-white" href="/admin">
            Admin
          </Link>
        </div>

        <a
          className="rounded-full bg-[#007acc] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3794ff]"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=angkon199@gmail.com&su=Portfolio%20Inquiry"
          target="_blank"
          rel="noreferrer"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}
