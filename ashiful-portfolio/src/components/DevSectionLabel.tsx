"use client";

import { motion } from "framer-motion";

type DevSectionLabelProps = {
  label: string;
  comment?: string;
};

export default function DevSectionLabel({
  label,
  comment,
}: DevSectionLabelProps) {
  return (
    <div>
      <p className="font-mono text-sm text-[#6a9955]">
        {comment ?? `// ${label.toLowerCase().replace(/\s+/g, "_")}`}
      </p>
      <motion.h2
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-3 text-3xl font-black sm:text-5xl"
      >
        {label}
      </motion.h2>
    </div>
  );
}
