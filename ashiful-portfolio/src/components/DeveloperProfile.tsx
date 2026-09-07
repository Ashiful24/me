"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { linkedInHandle } from "@/lib/portfolio";

type Stat = {
  value: string;
  label: string;
};

const METRIC_PREFIX = "metric";

function TypingRole({
  role,
  showCursor,
  onComplete,
}: {
  role: string;
  showCursor: boolean;
  onComplete: () => void;
}) {
  const [displayRole, setDisplayRole] = useState("");

  useEffect(() => {
    let charIndex = 0;

    const typeInterval = window.setInterval(() => {
      charIndex += 1;
      setDisplayRole(role.slice(0, charIndex));

      if (charIndex >= role.length) {
        window.clearInterval(typeInterval);
        window.setTimeout(onComplete, 2200);
      }
    }, 45);

    return () => window.clearInterval(typeInterval);
  }, [role, onComplete]);

  return (
    <>
      <span className="text-[#ce9178]">&quot;{displayRole}</span>
      <span
        className={`text-[#ce9178] ${showCursor ? "opacity-100" : "opacity-0"}`}
      >
        |
      </span>
      <span className="text-[#ce9178]">&quot;</span>
    </>
  );
}

export default function DeveloperProfile({
  name,
  roles,
  location,
  status,
  linkedInUrl,
  avatarUrl,
  username,
  stats,
  metricStats = [],
}: {
  name: string;
  roles: string[];
  location: string;
  status: string;
  linkedInUrl: string;
  avatarUrl: string;
  username?: string;
  stats: Stat[];
  metricStats?: Stat[];
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const cycleRoles = roles.length > 0 ? roles : [status];
  const handle = linkedInHandle(linkedInUrl);
  const windowLabel = username
    ? `profile.ts — ~/${username}`
    : "profile.ts";

  const handleRoleComplete = useCallback(() => {
    setRoleIndex((current) => (current + 1) % cycleRoles.length);
  }, [cycleRoles.length]);

  useEffect(() => {
    const blink = window.setInterval(() => {
      setShowCursor((current) => !current);
    }, 530);

    return () => window.clearInterval(blink);
  }, []);

  const avatarBlock = (sizeClass: string) =>
    avatarUrl ? (
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-[#007acc]/60 ${sizeClass}`}
      >
        <Image
          src={avatarUrl}
          alt={name}
          fill
          priority
          unoptimized={avatarUrl.startsWith("http")}
          className="object-cover object-center"
          sizes="192px"
        />
      </div>
    ) : (
      <div
        className={`grid place-items-center rounded-2xl border-2 border-dashed border-[#3c3c3c] bg-[#252526] font-mono text-xs text-[#858585] ${sizeClass}`}
      >
        no avatar
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-xl lg:mx-0"
    >
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#007acc]/25 to-[#c586c0]/10 blur-2xl sm:-inset-4" />

      <div className="relative overflow-hidden rounded-2xl border border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#252526] px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
          <span className="ml-1 min-w-0 truncate font-mono text-[10px] text-[#858585] sm:ml-2 sm:text-xs">
            {windowLabel}
          </span>
        </div>

        <div className="relative p-4 sm:p-6">
          <div className="absolute right-3 top-3 hidden sm:block">
            <motion.div whileHover={{ scale: 1.05 }}>
              {avatarBlock("h-40 w-40 shadow-lg shadow-[#007acc]/20")}
            </motion.div>
            <p className="mt-2 text-center font-mono text-[10px] text-[#858585]">
              avatar.png
            </p>
          </div>

          <div className="min-w-0 font-mono text-[12px] leading-6 sm:pr-44 sm:text-[13px] sm:leading-7">
            {(
              [
                <>
                  <span className="text-[#c586c0]">export const</span>{" "}
                  <span className="text-[#4ec9b0]">developer</span>{" "}
                  <span className="text-[#d4d4d4]">= {"{"}</span>
                </>,
                <>
                  <span className="text-[#9cdcfe]">name</span>
                  <span className="text-[#d4d4d4]">: </span>
                  <span className="text-[#ce9178]">&quot;{name}&quot;</span>
                  <span className="text-[#d4d4d4]">,</span>
                </>,
                <>
                  <span className="text-[#9cdcfe]">role</span>
                  <span className="text-[#d4d4d4]">: </span>
                  <TypingRole
                    key={cycleRoles[roleIndex]}
                    role={cycleRoles[roleIndex]}
                    showCursor={showCursor}
                    onComplete={handleRoleComplete}
                  />
                  <span className="text-[#d4d4d4]">,</span>
                </>,
                <>
                  <span className="text-[#9cdcfe]">location</span>
                  <span className="text-[#d4d4d4]">: </span>
                  <span className="text-[#ce9178]">&quot;{location}&quot;</span>
                  <span className="text-[#d4d4d4]">,</span>
                </>,
                <>
                  <span className="text-[#9cdcfe]">status</span>
                  <span className="text-[#d4d4d4]">: </span>
                  <span className="text-[#ce9178]">&quot;{status}&quot;</span>
                  <span className="text-[#d4d4d4]">,</span>
                </>,
                <>
                  <span className="text-[#9cdcfe]">linkedin</span>
                  <span className="text-[#d4d4d4]">: </span>
                  {linkedInUrl ? (
                    <a
                      href={linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#ce9178] underline decoration-[#007acc]/50 underline-offset-2 transition hover:text-[#9cdcfe]"
                    >
                      &quot;{handle}&quot;
                    </a>
                  ) : (
                    <span className="text-[#ce9178]">&quot;&quot;</span>
                  )}
                  <span className="text-[#d4d4d4]">,</span>
                </>,
                <span className="text-[#d4d4d4]">{"};"}</span>,
              ] as const
            ).map((line, i) => (
              <div key={i} className="flex gap-2 sm:gap-3">
                <span className="w-3 shrink-0 select-none text-right text-[#858585]">
                  {i + 1}
                </span>
                <p className="min-w-0 break-words">{line}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 block sm:hidden">
            <div className="mx-auto h-40 w-40">{avatarBlock("h-40 w-40")}</div>
            {linkedInUrl ? (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-center font-mono text-xs text-[#569cd6] underline underline-offset-2"
              >
                linkedin → {handle}
              </a>
            ) : null}
          </div>

          {(stats.length > 0 || metricStats.length > 0) && (
            <div className="mt-6 border-t border-[#3c3c3c] pt-4">
              <p className="font-mono text-xs text-[#6a9955]">
                $ npm run stats --production
              </p>
              {stats.length > 0 && (
                <div className="mt-3 grid grid-cols-1 gap-3 min-[400px]:grid-cols-3">
                  {stats.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.12 }}
                      whileHover={{
                        scale: 1.03,
                        borderColor: "rgba(0, 122, 204, 0.6)",
                      }}
                      className="rounded-xl border border-[#3c3c3c] bg-[#252526] p-3 font-mono transition-colors hover:bg-[#2d2d30]"
                    >
                      <p className="text-lg font-bold text-[#4ec9b0]">
                        {item.value}
                      </p>
                      <p className="mt-1 break-words text-[10px] leading-4 text-[#858585]">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
              {metricStats.length > 0 && (
                <div
                  className={`space-y-1 ${stats.length > 0 ? "mt-2" : "mt-3"}`}
                >
                  {metricStats.map((item) => (
                    <div
                      key={`${item.value}-${item.label}`}
                      className="flex flex-wrap items-center gap-2 font-mono text-xs"
                    >
                      <span className="text-[#858585]">{METRIC_PREFIX}:</span>
                      <span className="text-[#4ec9b0]">{item.value}</span>
                      <span className="break-words text-[#858585]">
                        · {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
