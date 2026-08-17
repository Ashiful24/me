"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { linkedInHandle } from "@/lib/portfolio";

type Stat = {
  value: string;
  label: string;
};

type BuildMetric = {
  value: string;
  label: string;
};

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
  stats,
  buildMetric,
}: {
  name: string;
  roles: string[];
  location: string;
  status: string;
  linkedInUrl: string;
  avatarUrl: string;
  stats: Stat[];
  buildMetric?: BuildMetric;
}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const cycleRoles = roles.length > 0 ? roles : [status];
  const handle = linkedInHandle(linkedInUrl);

  const handleRoleComplete = useCallback(() => {
    setRoleIndex((current) => (current + 1) % cycleRoles.length);
  }, [cycleRoles.length]);

  useEffect(() => {
    const blink = window.setInterval(() => {
      setShowCursor((current) => !current);
    }, 530);

    return () => window.clearInterval(blink);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-xl"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#007acc]/25 to-[#c586c0]/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#252526] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-[#858585]">
            profile.ts — ~/ashiful-portfolio
          </span>
        </div>

        <div className="relative p-5 sm:p-6">
          <div className="absolute right-3 top-3 hidden sm:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-40 w-40 overflow-hidden rounded-2xl border-2 border-[#007acc]/60 shadow-lg shadow-[#007acc]/20"
            >
              <Image
                src={avatarUrl || "/profile.png"}
                alt={name}
                fill
                priority
                unoptimized={avatarUrl.startsWith("http")}
                className="object-cover object-center"
                sizes="160px"
              />
            </motion.div>
            <p className="mt-2 text-center font-mono text-[10px] text-[#858585]">
              avatar.png
            </p>
          </div>

          <div className="font-mono text-[13px] leading-7 sm:pr-44">
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">1</span>
              <p>
                <span className="text-[#c586c0]">export const</span>{" "}
                <span className="text-[#4ec9b0]">developer</span>{" "}
                <span className="text-[#d4d4d4]">= {"{"}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">2</span>
              <p>
                <span className="text-[#9cdcfe]">name</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">&quot;{name}&quot;</span>
                <span className="text-[#d4d4d4]">,</span>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">3</span>
              <p>
                <span className="text-[#9cdcfe]">role</span>
                <span className="text-[#d4d4d4]">: </span>
                <TypingRole
                  key={cycleRoles[roleIndex]}
                  role={cycleRoles[roleIndex]}
                  showCursor={showCursor}
                  onComplete={handleRoleComplete}
                />
                <span className="text-[#d4d4d4]">,</span>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">4</span>
              <p>
                <span className="text-[#9cdcfe]">location</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">&quot;{location}&quot;</span>
                <span className="text-[#d4d4d4]">,</span>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">5</span>
              <p>
                <span className="text-[#9cdcfe]">status</span>
                <span className="text-[#d4d4d4]">: </span>
                <span className="text-[#ce9178]">&quot;{status}&quot;</span>
                <span className="text-[#d4d4d4]">,</span>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">6</span>
              <p>
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
              </p>
            </div>
            <div className="flex gap-3">
              <span className="select-none text-[#858585]">7</span>
              <p className="text-[#d4d4d4]">{"};"}</p>
            </div>
          </div>

          <div className="mt-6 block sm:hidden">
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border-2 border-[#007acc]/60">
              <Image
                src={avatarUrl || "/profile.png"}
                alt={name}
                fill
                unoptimized={avatarUrl.startsWith("http")}
                className="object-cover object-center"
                sizes="192px"
              />
            </div>
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

          {stats.length > 0 && (
            <div className="mt-6 border-t border-[#3c3c3c] pt-4">
              <p className="font-mono text-xs text-[#6a9955]">
                $ npm run stats --production
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
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
                    <p className="mt-1 text-[10px] leading-4 text-[#858585]">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
              {buildMetric && (
                <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#858585]">build time:</span>
                  <span className="text-[#4ec9b0]">{buildMetric.value}</span>
                  <span className="text-[#858585]">· {buildMetric.label}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
