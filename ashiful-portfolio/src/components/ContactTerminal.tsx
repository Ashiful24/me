"use client";

import { getIcon } from "@/lib/icons";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  iconKey: string;
  color: string;
};

export default function ContactTerminal({
  links,
  username,
  title,
}: {
  links: ContactLink[];
  username?: string;
  title?: string;
}) {
  const host = username || "portfolio";

  const Prompt = () => (
    <>
      <span className="text-[#89d185]">{host}@dev</span>
      <span className="text-[#cccccc]">:</span>
      <span className="text-[#569cd6]">~/contact</span>
      <span className="text-[#cccccc]">$ </span>
    </>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#0c0c0c]">
      <div className="flex items-center justify-between border-b border-[#3c3c3c] bg-[#1e1e1e] px-3 py-1.5">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="rounded-sm bg-[#007acc] px-2 py-0.5 text-white">
            TERMINAL
          </span>
          <span className="text-[#858585]">bash</span>
        </div>
        <span className="font-mono text-[10px] text-[#858585]">
          {links.length} channel{links.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="space-y-5 p-4 font-mono text-[12px] leading-6 sm:p-5 sm:text-[13px] sm:leading-7">
        <div>
          <p>
            <Prompt />
            <span className="text-[#dcdcaa]">whoami</span>
          </p>
          <p className="pl-0 text-[#ce9178] sm:pl-0">{title || "developer"}</p>
        </div>

        <div>
          <p>
            <Prompt />
            <span className="text-[#dcdcaa]">cat ./reach_out.txt</span>
          </p>
          <p className="mt-1 max-w-3xl break-words whitespace-pre-wrap text-[#cccccc]">
            Looking to hire a software engineer, discuss a project, or get in
            touch? This is the place — pick a channel below and say hello.
          </p>
        </div>

        <div>
          <p>
            <Prompt />
            <span className="text-[#dcdcaa]">ls -la channels/</span>
          </p>

          {links.length === 0 ? (
            <p className="mt-2 text-[#6a9955]"># empty directory</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[20rem] border-collapse text-left">
                <thead>
                  <tr className="text-[#858585]">
                    <th className="pb-2 pr-4 font-normal">type</th>
                    <th className="pb-2 pr-4 font-normal">name</th>
                    <th className="pb-2 font-normal">value</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const Icon = getIcon(link.iconKey);
                    const external =
                      link.href.startsWith("http") ||
                      link.href.startsWith("mailto:") ||
                      link.href.startsWith("tel:");

                    return (
                      <tr
                        key={link.label}
                        className="border-t border-[#1e1e1e] transition hover:bg-[#1a1a1a]"
                      >
                        <td className="py-2.5 pr-4 align-middle">
                          <a
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="inline-flex h-8 w-8 items-center justify-center"
                            aria-label={link.label}
                          >
                            <Icon
                              className={`h-5 w-5 shrink-0 ${link.color}`}
                            />
                          </a>
                        </td>
                        <td className="py-2.5 pr-4 align-top">
                          <a
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="text-[#4ec9b0] underline-offset-2 hover:underline"
                          >
                            {link.label.toLowerCase().replace(/\s+/g, "_")}
                          </a>
                        </td>
                        <td className="py-2.5 align-top">
                          <a
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="whitespace-pre-line break-words text-[#ce9178] hover:text-[#9cdcfe]"
                          >
                            {link.value}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p>
          <Prompt />
          <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] animate-pulse bg-[#cccccc] align-[-0.1em]" />
        </p>
      </div>
    </div>
  );
}
