"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Module-level: true on first JS execution (hard load / reload), false for all
// subsequent client-side navigations within the same session. This intentional
// module state drives the one-time intro fade — the lint suppression below marks
// that this render-time read/write is deliberate, not an accident.
let isFirstLoad = true;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const animate = isFirstLoad;
  // eslint-disable-next-line react-hooks/globals
  isFirstLoad = false;

  return (
    <motion.div
      key={pathname}
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
