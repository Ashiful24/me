import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const quickLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ashiful24",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/Ashiful-Islam-Istiuk/",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:angkon199@gmail.com",
    icon: SiGmail,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#3c3c3c] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-white">
            K. M. ASHIFUL ISLAM ISTIUK
          </p>
          <p className="mt-2 text-sm text-[#8a8a8a]">
            Junior Software Engineer · Dhaka, Bangladesh
          </p>
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

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

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
      </div>

      <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-[#6a6a6a] sm:text-left">
        © {year} K. M. Ashiful Islam Istiuk. Built with Next.js & Tailwind
        CSS.
      </p>
    </footer>
  );
}
