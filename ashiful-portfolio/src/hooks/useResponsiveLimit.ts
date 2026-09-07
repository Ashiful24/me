"use client";

import { useEffect, useState } from "react";

type Limits = {
  mobile: number;
  /** Applied from md (768px) up to lg. Falls back to mobile if omitted. */
  tablet?: number;
  /** Applied from lg (1024px)+. */
  desktop: number;
};

function resolveLimit(limits: Limits) {
  if (typeof window === "undefined") return limits.mobile;
  if (window.matchMedia("(min-width: 1024px)").matches) return limits.desktop;
  if (
    limits.tablet !== undefined &&
    window.matchMedia("(min-width: 768px)").matches
  ) {
    return limits.tablet;
  }
  return limits.mobile;
}

/** Responsive visible-item limit. Supports mobile / tablet / desktop. */
export function useResponsiveLimit(
  mobileOrLimits: number | Limits,
  desktop?: number,
) {
  const limits: Limits =
    typeof mobileOrLimits === "number"
      ? { mobile: mobileOrLimits, desktop: desktop ?? mobileOrLimits }
      : mobileOrLimits;

  const [limit, setLimit] = useState(limits.mobile);

  useEffect(() => {
    const sync = () => setLimit(resolveLimit(limits));
    sync();

    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    md.addEventListener("change", sync);
    lg.addEventListener("change", sync);
    return () => {
      md.removeEventListener("change", sync);
      lg.removeEventListener("change", sync);
    };
  }, [limits.mobile, limits.tablet, limits.desktop]);

  return limit;
}
